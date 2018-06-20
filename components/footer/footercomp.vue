<template>
    <div class="black __footer">
       <v-container fill-height fluid dark>
           <div id="wrapper">
               <div id="act">
                   <span id="title">Act of Kindness</span>
                   <v-divider class="grey ligthen-4 mt-3"></v-divider>
                   <div id="wrapper_inner">
                       <div id="grid_inner_item">
                           <a>Home</a>
                       </div>
                       <div id="grid_inner_item">
                           <a>How it works?</a>
                       </div>
                       <div id="grid_inner_item">
                            <a>Featured Artworks</a>
                       </div>
                       <div id="grid_inner_item">
                            <a>About Us</a>                           
                       </div>
                       <div id="grid_inner_item">
                            <a>Browse by Category</a>                            
                       </div>
                       <div id="grid_inner_item">
                            <a>Blog</a>
                       </div>
                       <div id="grid_inner_item">
                            <a>Browse by Price</a>
                       </div>
                       <div id="grid_inner_item">
                            <a>Contact Us</a>
                       </div>
                        <div id="grid_inner_item">
                            <a>Partners</a>
                       </div>
                        <div id="grid_inner_item">
                            <a>Privacy and Policy</a>                           
                       </div>
                        <div id="grid_inner_item">
                            <a>Artists</a>
                       </div>
                        <div id="grid_inner_item">
                            <a>Terms and Conditions</a>                            
                        </div>
                   </div>
               </div>
               <div id="buyers">
                   <span id="title">For Buyers</span>
                   <v-divider class="grey ligthen-4 mt-3"></v-divider>
                   <div id="wrapper_inner_1">
                       <div id="grid_inner_item">
                           <a>Buyers FAQ</a>
                       </div>
                       <div id="grid_inner_item">
                           <a>Testimonials</a>
                       </div>
                       <div id="grid_inner_item">
                           <a>Curator Circle</a>
                       </div>
                       <div id="grid_inner_item">
                           <a>Catalog</a>
                       </div>
                   </div>
               </div>
               <div id="sellers">
                   <span id="title">For Sellers</span>
                   <v-divider class="grey ligthen-4 mt-3"></v-divider>
                   <div id="wrapper_inner_1">
                       <div id="grid_inner_item">
                           <a>Why Sell</a>
                       </div>
                       <div id="grid_inner_item">
                           <a>Guide</a>
                       </div>
                   </div>
               </div>
               <div id="contactNum" class="hidden-sm-and-up">
                   <span id="copyright">Contact Us : 09123456789</span>
               </div>
                <div id="contactEmail" class="hidden-sm-and-up">
                    <span id="copyright">Email us: support@aoklife.com</span>
               </div>
               <div id="divide" class="pt-3 pb-3">
                   <v-divider class="grey lighten-3"></v-divider>
               </div>
               <div id="copy">
                    <span id="copyright">© 2017 Acts Of Kindness</span>
               </div>
               <div id="links">
                    <v-btn icon flat dark><v-icon>fab fa-linkedin</v-icon></v-btn>
                    <v-btn icon flat dark><v-icon>fab fa-twitter</v-icon></v-btn>
                    <v-btn icon flat dark><v-icon>fab fa-facebook</v-icon></v-btn>
                    <v-btn icon flat dark><v-icon>fab fa-instagram</v-icon></v-btn>

               </div>
           </div>
       </v-container>
    </div>
</template>

<style scoped>
    .__footer {
        width: 100%;
        height: 100%;
    }
    #divide {
        grid-area: d;
    }
    .fab {
        font-family: Font Awesome\ 5 Brands !important;
    }
    #wrapper {
        padding: 3% 1% 0 10%;
        display: grid;
        grid-template-columns: 325px 325px 1fr 1fr;
        grid-gap: 20px; 
        grid-template-rows: auto;
        grid-template-areas: 
            "a a b s"
            "d d d d"
            "c . . l";
        color: whitesmoke;
    }
    #contactNum {
        grid-area: cn;
    }
    #contactEmail {
        grid-area: ce;
    }
    #act {
        grid-area: a;
    }
    #buyers {
        grid-area: b;
    }
    #sellers {
        grid-area: s;
    }
    #copy {
        grid-area: c;
    }
    #links {
        grid-area: l;
    }
    * {
        font-family: 'Nunito Sans', sans-serif;
    }
    #copyright{
        font-size: 16px;
    }
    #title {
        font-size: 18px;
    }
    #wrapper_inner {
        display: grid;
        grid-template-columns: 300px 300px;
        grid-template-rows: auto;
    }
     #wrapper_inner_1 {
        display: grid;
        grid-template-columns: 250px;
        grid-template-rows: auto;
    }
    #grid_inner_item {
        text-align: left;
        margin: 20px 10px 10px 20px;
    }
     @media only screen and (max-width: 768px)  {
        #wrapper {
            width: 100%;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(2,1fr);
            grid-template-rows: auto;
            grid-template-areas: 
                "a a"
                "b s"
                "cn cn"
                "ce ce"
                "d d"
                "l l"
                "c c"
                ;
            color: whitesmoke;
        }
        #wrapper_inner {
            display: grid;
            grid-template-columns: 150px 1fr;
            grid-template-rows: auto;
        }

        #wrapper_inner_1 {
            display: grid;
            grid-template-columns: 95px;
            grid-template-rows: auto;
        }
         #grid_inner_item {
            text-align: left;
            margin: 5px 5px 5px 5px;
        }
        a {
            text-transform: none;
            color: whitesmoke;
            font-size: 14px !important;
        }
        #links {
            text-align: center;
        }
        #copy {
            text-align: center;
        }
    }
    a {
        text-transform: none;
        color: whitesmoke;
        font-size: 16px;
    }

    @media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
        #wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 50px; 
            grid-template-rows: auto;
            grid-template-areas: 
                "a a b s"
                "c . . l";
            color: whitesmoke;
        }
        #wrapper_inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
        }
        
        #wrapper_inner_1 {
            display: grid;
            grid-template-columns: 130px;
            grid-template-rows: auto;
        }
    }
    @media only screen and (device-width: 768px) {
        #wrapper {
            padding: 3% 0 0 1%;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 15px; 
            grid-template-rows: auto;
            grid-template-areas: 
                "a a b s"
                "c . . l";
            color: whitesmoke;
        }
        #wrapper_inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
        }
        
        #wrapper_inner_1 {
            display: grid;
            grid-template-columns: 50px;
            grid-template-rows: auto;
        }
    }
</style>

