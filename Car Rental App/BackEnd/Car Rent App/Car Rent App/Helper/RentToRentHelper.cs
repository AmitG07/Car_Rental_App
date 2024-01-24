using BusinessObjectLayer;
using Car_Rent_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rent_App.Helper
{
    public class RentToRentHelper
    {
        public RentCar RentToRentMapping(Rent cm)
        {
            RentCar c = new RentCar();
            c.UserId = cm.UserId;
            c.CarId = cm.CarId;
            c.StartDate = cm.StartDate;
            c.EndDate = cm.EndDate;
            c.RentedPrice = cm.RentedPrice;
            return c;
        }
    }
}
