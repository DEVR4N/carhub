"use client";
import {fetchCars} from "@/utils";
import {HomeProps} from "@/types";
import {fuels, yearsOfProduction} from "@/constants";
import {CarCard, ShowMore, SearchBar, CustomFilter, Hero} from "@/components";
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Home({searchParams}: HomeProps) {
    const [allCars, setAllCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const [fuel, setFuel] = useState('');
    const [year, setYear] = useState(2022);
    const [limit, setLimit] = useState(10);

    const getCars = async () => {
        setLoading(true);
        try {
            const result = await fetchCars({
                manufacturer: manufacturer || "",
                year: year || 2022,
                fuel: fuel || "",
                limit: limit || 10,
                model: model || "",
            });

            setAllCars(result);
            setLoading(false);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getCars();
    }, [fuel, year, limit, manufacturer, model]);


    const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

    return (
        <main className='overflow-hidden'>
            <Hero/>

            <div className='mt-12 padding-x padding-y max-width' id='discover'>
                <div className='home__text-container'>
                    <h1 className='text-4xl font-extrabold'>Araç Katalogu</h1>
                    <p>Sizler için özenle seçilmiş araçlarımızı inceleyin.</p>
                </div>

                <div className='home__filters'>
                    <SearchBar setManufacturer={setManufacturer} setModel={setModel}/>

                    <div className='home__filter-container'>
                        <CustomFilter title='fuel' options={fuels} setFilter={setFuel}/>
                        <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear}/>
                    </div>
                </div>

                {allCars.length > 0 ? (
                    <section>
                        <div className='home__cars-wrapper'>
                            {allCars?.map((car) => (
                                <CarCard car={car}/>
                            ))}
                        </div>
                        <div className="mt-16 w-full flex-center gap-5">
                            {loading && <Image src="/loader.svg" alt="loader" width={50} height={50}/>}
                        </div>
                        <ShowMore
                            pageNumber={limit / 10}
                            isNext={(limit > allCars.length)}
                            setLimit={setLimit}
                        />
                    </section>
                ) : (
                    <div className='home__error-container'>
                        <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
                    </div>
                )}
            </div>
        </main>
    );
}