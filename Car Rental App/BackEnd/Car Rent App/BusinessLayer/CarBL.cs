using BusinessLayer.Interface;
using BusinessObjectLayer;
using DataAccessLayer.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer
{
    public class CarBL : ICarBL
    {
        private readonly ICarDAL _carDAL;

        public CarBL(ICarDAL carDAL)
        {
            _carDAL = carDAL;
        }

        public int AddCar(Car car)
        {
            return _carDAL.AddCar(car);
        }

        public bool EditCarById(Car value)
        {
            var car = _carDAL.EditCarById(value);
            return car;
        }

        public Car GetCarById(int id)
        {
            var product = _carDAL.GetCarById(id);
            return product;
        }

        public IEnumerable<Car> GetAllCars()
        {
            var car = _carDAL.GetAllCars();
            if (car != null)
                return car;
            else
                return null;
        }

        public bool DeleteCar(int id)
        {
            var car = _carDAL.DeleteCar(id);
            return car;
        }
    }
}