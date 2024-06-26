"use client";

import Image from "next/image";
import {CarProps} from "@/types";
import {calculateCarRent} from "@/utils";
import {CustomButton} from "@/components/index";
import {CarDetails} from "@/components/index";
import {useState} from "react";

interface CarCardProps {
    car: CarProps;
}

const CarCard = ({car}: CarCardProps) => {

    const {city_mpg, year, make, model, transmission, drive} = car;

    const [isOpen, setIsOpen] = useState(false);
    const carRent = calculateCarRent(city_mpg, year);
    return (
        <div className="car-card group">
            <div className="car-card__content">
                <h2 className="car-card__content-title">
                    {make} {model}
                </h2>
            </div>

            <p className="flex mt-6 text-[32px] font-extrabold">
                <span className="self-start text-[14px] font-semibold"> $ </span>
                {carRent}
                <span className="self-end text-[14px]"> /günlük </span>
            </p>

            <div className="relative w-full h-40 my-3 object-contain">
                <Image src="/porsche.png" alt="Car model" fill priority className="object-contain" />
            </div>

            <div className="relative flex w-full mt-2">
                <div className="flex group-hover:invisible w-full justify-between text-gray">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src="/steering-wheel.svg" alt="Steering wheel" width={20} height={20} />
                        <p className="text-[14px]">
                            {transmission === 'a' ? 'Automatic' : 'Manual'}
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src="/tire.svg" alt="Tire" width={20} height={20} />
                        <p className="text-[14px]">
                            {drive.toUpperCase()}
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src="/gas.svg" alt="Gas" width={20} height={20} />
                        <p className="text-[14px]">
                            {city_mpg} MPG
                        </p>
                    </div>
                </div>

                <div className="car-card__btn-container">
                <CustomButton title="Detaylar" containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                              textStyles="text-white text-[14px] leading-[17px] font-bold" rightIcon="arrow-right.svg"
                              handleClick={() => setIsOpen(true)} btnType="button" />
                </div>

            </div>

            <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
        </div>
    )
}

export default CarCard;