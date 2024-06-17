import Image from "next/image";
import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import {fetchCars} from "@/utils";
import {fuels, yearsOfProduction} from "@/constants";
export default async function Home({searchParams}) {

    const allCars = await fetchCars({
        manufacturer: searchParams.manufacturer || '',
        model: searchParams.model || 2020,
        year: searchParams.year || '',
        fuel: searchParams.fuel || '',
        limit: searchParams.limit || 10,
    });
    const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
        <div className="mt-12 padding-x padding-y max-width" id="discover">
            <div className="home__text-container">
                <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
                <p>Explore the cars you might like</p>
            </div>
            <div className="home__filters">
                <SearchBar />

                <div className="home__filter-container">
                    <CustomFilter title="fuel" options={fuels} />
                    <CustomFilter title="year" options={yearsOfProduction} />
                </div>
            </div>

            {!isDataEmpty ? (
                <section>
                    <div className="home__cars-wrapper">
                        {allCars?.map((car) => <CarCard car={car} />)}
                    </div>
                </section>
            ): (
            <div className="home__error-container">
                <h1 className="text-black text-xl font-bold"> Sorry, no cars found </h1>
                <p> {allCars?.message} </p>
            </div>
            )}
        </div>
    </main>
  )
}
