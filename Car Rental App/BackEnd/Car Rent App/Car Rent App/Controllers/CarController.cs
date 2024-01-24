using BusinessLayer.Interface;
using BusinessObjectLayer;
using Car_Rent_App.Helper;
using Car_Rent_App.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rent_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarBL _carBL;

        public CarController(ICarBL carBL)
        {
            _carBL = carBL;
        }

        [HttpPost]
        [Route("post")]
        public int Post([FromBody] CarModel value)
        {
            if (value != null)
            {
                Car car = new CarModelToCarHelper().CarModelToCarMapping(value);
                if (ModelState.IsValid)
                {
                    return _carBL.AddCar(car);
                }
            }
            return 0;
        }

        [HttpGet("{id}")]
        [Route("EditCarById/{id}")]
        public bool EditProductById(int id, [FromBody] CarModel value)
        {
            if (value != null)
            {
                Car car = new CarModelToCarHelper().CarModelToCarMapping(value);
                car.CarId = id;
                if (_carBL.EditCarById(car))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            return false;
        }

        [HttpGet("{id}")]
        [Route("GetCarById/{id}")]
        public CarModel GetCarById(int id)
        {
            Car car = _carBL.GetCarById(id);
            if (car != null)
            {
                var prod = new CarToCarHelper().CarToCarMapping(car);
                return prod;
            }
            return null;
        }

        [HttpGet]
        [Route("GetAllCars")]
        public IEnumerable<Car> GetAllCars()
        {
            return _carBL.GetAllCars();
        }

        [HttpGet("{id}")]
        [Route("DeleteCar/{id}")]
        public bool DeleteCar(int id)
        {
            var value = _carBL.DeleteCar(id);
            string CarId = id.ToString();
            return value;
        }
    }
}
