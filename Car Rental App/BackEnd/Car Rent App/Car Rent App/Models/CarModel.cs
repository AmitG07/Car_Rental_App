using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rent_App.Models
{
    public class CarModel
    {
        public int CarId { get; set; }
        public string VehicleId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public float RentalPrice { get; set; }
        public string Image { get; set; }
    }
}
