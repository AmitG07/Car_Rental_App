using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Interface
{
    public interface ICarDAL
    {
        public int AddCar(Car car);
        public bool EditCarById(Car value);
        public Car GetCarById(int id);
        public IEnumerable<Car> GetAllCars();
        public bool DeleteCar(int id);
    }
}
