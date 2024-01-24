using BusinessObjectLayer;
using DataAccessLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccessLayer
{
    public class CarDAL : ICarDAL
    {
        private readonly ApplicationDbContext _context;

        public CarDAL(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public int AddCar(Car car)
        {
            if (car != null)
            {
                _context.Cars.Add(car);
                _context.SaveChanges();
                int id = car.CarId;
                return id;
            }
            else
            {
                return 0;
            }
        }

        public bool EditCarById(Car car)
        {
            car.CarId = car.CarId;
            _context.Cars.Update(car);
            _context.SaveChanges();
            return true;
        }

        public Car GetCarById(int id)
        {
            var car = _context.Cars.ToList().FirstOrDefault(c => c.CarId == id);
            return car;
        }

        public IEnumerable<Car> GetAllCars()
        {
            IEnumerable<Car> cars = _context.Cars.ToList();
            return cars;
        }

        public bool DeleteCar(int id)
        {
            var query = from car in _context.Cars where car.CarId == id select car;
            if (query != null)
            {   
                var car = query.ToList().FirstOrDefault();
                _context.Cars.Remove(car);
                _context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
