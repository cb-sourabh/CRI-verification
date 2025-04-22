// app.post("/api/generate_portal_session", (req, res) => {
//     chargebee.portal_session
//       .create({
//         customer: {
//           id: "169zVMUgQi9YD2TFZ",
//         },
//       })
//       .request(function (error, result) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log(result.portal_session);
//           res.send(result.portal_session);
//         }
//       });
//   });

const express = require("express");
const cors = require("cors");
 const chargebee = require("chargebee");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

chargebee.configure({ site: "sourabh02-test", api_key: "test_gR1MwI5daaBcRz3Pd6mlWD8cdsJxacsX3" });

// chargebee.configure({ site: "sourabh-charge-1-test", api_key: "test_Hgezazn6VpDLYgkR9jQHTVLJkuYhszFy" });


app.post("/api/generate_portal_session", async (req, res) => {
  chargebee.portal_session
    ?.create({ customer: { id: "169zVMUgQi9YD2TFZ" } })  
    .request((error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send({ error: "Chargebee error" });
      } else {
       // console.log(result.portal_session);
        res.send(result.portal_session);
      }
    });

});

app.post("/api/generate_pcnew", async (req, res) =>{
    chargebee.hosted_page
        .checkout_new_for_items({
        // subscription: {
        //   id: "169zVMUgQi0Vv2T4L",
        // },
       // layout: "full_page",
        subscription_items: [
          {
           // item_price_id: "plan-1-USD-Monthly",
            item_price_id: "java-course-USD-Monthly",
           // item_price_id: "cbdemo_business-suite-monthly",
          },
          // {
          //   item_price_id : "basic-USD",
          //   quantity : 1
          // }]
        ],
        // customer: {
        //   id: "169zVMUgQi9YD2TFZ",
        //   email: "cbTEST44@cb.com",
        //   //cf_username: "TESTUSER4"
        // },
        billing_address: {
          email: "cbTEST44billing@cb.com",
        },
        //redirect_url: "https://www.dictionary.com/browse/online",
      })
      .request(function (error, result) {
        if (error) {
          //handle error
          console.log("hello",error);
        } else {
          //console.log(result);
          var hosted_page = result.hosted_page;
          res.send(result.hosted_page);
        }
      }); 
  });


  
  
const PORT = 8012;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// "chargebee": "^2.48.0",
//"chargebee": "file:../../work/chargebee-node",