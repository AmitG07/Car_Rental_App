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
    public class RentController : ControllerBase
    {
        private readonly IRentBL _rentBL;

        public RentController(IRentBL rentBL)
        {
            _rentBL = rentBL;
        }

        [HttpPost]
        [Route("RentCar")]
        public bool RentCar([FromBody] RentCar car)
        {
            Rent c = new RentCarToRentHelper().RentCarToRentMapping(car);
            return _rentBL.RentCar(c);
        }

        // PUT api/<RentController>/5
        [HttpPut("{id}")]
        [Route("EditRent/{id}")]
        public bool EditRent(int id, [FromBody] Rent value)
        {
            if (value != null)
            {
                value.RentId = id;
                if (_rentBL.EditRent(value))
                {
                    return true;
                }
                else
                    return false;
            }
            return false;
        }

        // DELETE api/<RentController>/5
        [HttpDelete("{id}/{uid}")]
        [Route("DeleteRent/{id}/{uid}")]
        public bool DeleteRent(int id, int uId)
        {
            return _rentBL.DeleteRent(id, uId);
        }

        [HttpGet]
        [Route("GetAllRents")]
        public IEnumerable<Rent> GetAllRents()
        {
            return _rentBL.GetAllRents();
        }

        [HttpGet("{CarId}")]
        [Route("GetAvailableStatus/{CarId}")]
        public bool GetAvilableStatus(int CarId)
        {
            var p = _rentBL.GetAvailableStatus(CarId);
            return p;
        }

        [HttpGet("{id}")]
        [Route("GetRentById/{id}")]
        public RentCar GetRentById(int id)
        {
            Rent rent = _rentBL.GetRentById(id);
            if (rent != null)
            {
                var prod = new RentToRentHelper().RentToRentMapping(rent);
                return prod;
            }
            return null;
        }
    }
}
