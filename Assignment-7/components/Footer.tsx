export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 text-gray-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-bold text-white">🛒 বাজার দর</p>
          <p>প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>
        <p className="md:max-w-sm md:text-right">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}
