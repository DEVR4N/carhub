import {CarProps, FilterProps} from "@/types";

export async function fetchCars(filters: FilterProps) {
    const {manufacturer, model, year, fuel, limit} = filters;

    const headers = {
        'x-rapidapi-key': '1f960f18a7mshdafdc70d9dc3fd6p164476jsn8e372e82e078',
        'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
    };

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&fuel=${fuel}&limit=${limit}`,
        { headers: headers, }
    );

    const result = await response.json();

    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
    return rentalRatePerDay.toFixed(0);
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {

}