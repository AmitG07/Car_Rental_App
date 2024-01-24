using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BusinessObjectLayer
{
    public class Car
    {
        public int CarId { get; set; }
        public string VehicleId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public float RentalPrice { get; set; }
        public string Image { get; set; }
        [ForeignKey("CarId")]
        public ICollection<Rent> Rents { get; set; }
    }
}
