/* eslint-disable @next/next/no-img-element */

import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

interface Product {
    id: string,
    title: string,
    image: string
}

export default function Products() {
    const [fetchData, setFetchData] = useState(false);
    const [showSuccess, setShowSuccess] = useState<string | null>(null);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showDetail, setShowDetail] = useState<string | null>(null);
    const { isLoading, isError, error, data, isSuccess } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch("https://fakestoreapi.com/products");
            return res.json();
        },
        enabled: fetchData
    });

    const { data: dataProductDetail } = useQuery({
        queryKey: ["product", showDetail], // param kedua berfungsi agar ketika datanya berubah dia akan melakukan hit ulang
        queryFn: async () => {
            const res = await fetch(`https://fakestoreapi.com/products/${showDetail}`);
            return res.json();
        },
        enabled: showDetail !== null
    });

    const { mutate, isPending: isPendingAddProduct } = useMutation({
        mutationFn: async (formData: FormData) => {
            return await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                body: formData
            })
        },
        onSuccess: () => {
            setShowAddProduct(false);
            setShowSuccess("Success Add Data");
            setTimeout(() => {
                setShowSuccess(null);
            }, 2000)
        }
    })

    const onSubmitProduct = (e: FormEvent) => {
        e.preventDefault();
        mutate(new FormData(e.target as HTMLFormElement));
    }

    useEffect(() => {
        if (isSuccess) {
            setShowSuccess("Success Fetch Data");
            setTimeout(() => {
                setShowSuccess(null);
            }, 2000)
        }
    }, [isSuccess]);
    return (
        <div className="container mx-auto m-4">
            {
                !fetchData && (
                    <button onClick={() => setFetchData(true)} className="bg-blue-600 text-white rounded-lg px-3 py-2 cursor-pointer">Show Data</button>
                )
            }
            {
                showSuccess != null && (
                    <div className="bg-green-300 p-4 rounded-lg animate-bounce">{showSuccess}</div>
                )
            }
            {
                isLoading ? (
                    <h2 className="text-center font-bold text-lg">Loading....</h2>
                ) : (
                    isError ? (
                        <h2 className="text-center text-red-600 font-bold text-lg">{error.message}</h2>
                    ) : <>
                        <div className="mt-2">
                            <button onClick={() => setShowAddProduct(true)} className="bg-blue-600 text-white rounded-lg px-3 py-2 cursor-pointer">Add Data</button>
                            <div className={`fixed h-screen w-screen top-0 left-0 bg-black/50 ${showAddProduct ? 'flex justify-center items-center z-50' : 'hidden'
                                }`}>
                                <div className="relative w-1/2 bg-white flex items-center gap-8 p-8">
                                    <button className="absolute top-5 right-5 cursor-pointer" onClick={() => setShowAddProduct(false)}>X</button>
                                    <form className="w-full space-y-1" onSubmit={onSubmitProduct}>
                                        <label htmlFor="id" className="flex flex-col">
                                            ID:
                                            <input type="number" id="id" name="id" className="w-full p-2 border-2" />
                                        </label>
                                        <label className="flex flex-col" htmlFor="title">
                                            Title:
                                            <input type="text" id="title" name="title" className="w-full p-2 border-2" />
                                        </label>
                                        <label className="flex flex-col" htmlFor="price">
                                            Price:
                                            <input type="number" id="price" name="price" className="w-full p-2 border-2" />
                                        </label>
                                        <label className="flex flex-col" htmlFor="description">
                                            Description:
                                            <textarea id="description" name="description" className="w-full p-2 border-2" />
                                        </label>
                                        <label className="flex flex-col" htmlFor="category">
                                            Category:
                                            <input type="text" id="category" name="category" className="w-full p-2 border-2" />
                                        </label>
                                        <label className="flex flex-col" htmlFor="image">
                                            Image:
                                            <input type="text" id="image" name="image" className="w-full p-2 border-2" />
                                        </label>
                                        <button className="bg-black text-white p-3 text-center w-full mt-2">
                                            {isPendingAddProduct ? 'Loading' : 'Submit'}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                {
                                    data?.map((product: Product) => (
                                        <div onClick={() => setShowDetail(product.id)} key={product.id} className="shadow-xl rounded-xl p-4 flex flex-col items-center">
                                            <Image
                                                className="scale-50 h-40 w-fit"
                                                src={product.image} width={100} alt={product.title} height={100}
                                            />
                                            <h4 className="w-full line-clamp-1 font-bold text-center">{product.title}</h4>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }
            <div className={`fixed h-screen w-screen top-0 left-0 bg-black/50 ${showDetail ? 'flex justify-center items-center' : 'hidden'
                }`}>
                <div className="relative h-1/2 w-1/2 bg-white flex items-center gap-8 p-8">
                    <button className="absolute top-5 right-5 cursor-pointer" onClick={() => setShowDetail(null)}>X</button>
                    <img src={dataProductDetail?.image} alt={dataProductDetail?.title} className="w-1/4" />
                    <div className="w-3/4 space-y-3">
                        <h1 className="text-xl font-bold line-clamp-1">{dataProductDetail?.title}</h1>
                        <p className="text-base">{dataProductDetail?.description}</p>
                        <p className="font-bold text-xl">${dataProductDetail?.price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}