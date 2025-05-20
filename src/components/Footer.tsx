const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer class="bg-white border-t border-gray-200 py-4">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="tems-center">
          <div class="text-sm text-gray-500">
            © {currentYear} Mentalthy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;