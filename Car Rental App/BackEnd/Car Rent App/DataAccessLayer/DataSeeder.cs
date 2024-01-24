using BusinessObjectLayer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccessLayer
{
    public class DataSeeder
    {
        public static void SeedData(IApplicationBuilder applicationBuilder)
        {
            using (var seerviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = seerviceScope.ServiceProvider.GetService<ApplicationDbContext>();
                if (!context.Users.Any())
                {
                    var users = new List<User>
                {
                new User {Name="admin1", EmailId = "admin1@example.com",PhoneNumber="1234567899", Password = "P@ssword1", Isadmin=true },
                new User {Name="admin2", EmailId = "admin2@example.com",PhoneNumber="1234567898", Password = "P@ssword2", Isadmin=true},
                new User {Name="amit1", EmailId = "amit1@gmail.com",PhoneNumber="1234567898", Password = "Password1", Isadmin=false},
                new User {Name="amit2", EmailId = "amit2@gmail.com",PhoneNumber="1234567898", Password = "Password2", Isadmin=false},
                };

                    context.Users.AddRange(users);
                    context.SaveChanges();
                }
                if (!context.Cars.Any())
                {
                    var cars = new List<Car>
                    {
                        new Car {VehicleId="DL8CAX", Brand="Tata", Model = "Harrier", RentalPrice= 2000, Image="https://www.theindianwire.com/wp-content/uploads/2020/10/tata-harrier-dark-edition-front-launched.jpg"},
                        new Car {VehicleId="HR26EV", Brand="Toyota", Model = "Fortuner", RentalPrice= 4000, Image="https://www.freepnglogos.com/uploads/fortuner-png/toyota-fortuner-philippines-price-specs-and-promos-8.png" },
                        new Car {VehicleId="DL14EY", Brand="Maruti", Model = "Baleno", RentalPrice= 1500, Image="https://www.suzuki.com.au/sites/default/files/styles/model_variant_summary_default/public/image/Baleno-F34-Hero_WhiteGLXmodel_3160x1720.png" }
                    };
                    context.Cars.AddRange(cars);
                    context.SaveChanges();
                }
            }
        }
    }
}
