using BusinessObjectLayer;
using Car_Rent_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rent_App.Helper
{
    public class RentCarToRentHelper
    {
        public Rent RentCarToRentMapping(RentCar e)
        {
            Rent c = new Rent();
            c.CarId = e.CarId;
            c.UserId = e.UserId;
            c.StartDate = e.StartDate;
            c.EndDate = e.EndDate;
            c.RentedPrice = e.RentedPrice;
            return c;
        }
    }
}
