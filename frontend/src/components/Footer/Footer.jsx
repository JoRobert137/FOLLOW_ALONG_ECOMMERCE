function Footer() {
  return (
    <footer className="bg-blue-800 text-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">

          {/* Branding */}
          <div className="">
            <h1 className="text-4xl font-bold ">E-Com</h1>
            <p className="text-1xl font-normal pt-4">Your Store</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <h1 className="font-bold ">Quick Links</h1>
            <a href="/" className="hover:underline pt-2">Home</a>
            <a href="/myproducts" className="hover:underline">My Products</a>
            <a href="/addproducts" className="hover:underline">Add Products</a>
            <a href="/deals" className="hover:underline">Deals</a>
          </div>

          {/* Contact / Social */}
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <h1 className="font-bold">Contact</h1>
            <p>Email: support@ecom.com</p>
            <p>Phone: +91 12345 67890</p>
          </div>

        </div>

        <div className="mt-6 border-t border-gray-400 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} E-Com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
