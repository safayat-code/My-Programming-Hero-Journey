# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় নিত্যপণ্যের দৈনিক বাজার দর এক নজরে দেখার একটি Next.js ওয়েব অ্যাপ। চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার আজকের দাম, দাম বাড়া-কমার হার এবং বিভাগভিত্তিক বাজারের তুলনামূলক দাম দেখা যায়।

**Live Link:** <!-- deploy করার পর এখানে লিংক বসান -->
**GitHub:** <!-- repo লিংক -->

## 🧰 Technologies Used

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** — responsive styling
- **BetterAuth** — email/password + Google + GitHub login
- **MongoDB** (Atlas) — BetterAuth user/session storage
- **react-hot-toast** — toast notifications
- **BazarDor REST API** — product & category data

## ✨ Features

1. **লাইভ প্রাইস টিকার** — নেভবারের নিচে অসীম স্ক্রোলিং স্ট্রিপে emoji, নাম, দাম ও ▲/▼ পরিবর্তন।
2. **দাম বাড়া/কমার সেকশন** — হোম পেজে শীর্ষ ৬টি দাম-বাড়া ও ৬টি দাম-কমা পণ্য।
3. **ক্যাটাগরি পেজ ও সাজান (Sort)** — বাংলা সংখ্যা সঠিকভাবে হ্যান্ডেল করে সংখ্যাভিত্তিক সর্টিং।
4. **প্রোডাক্ট ডিটেইলস (Protected)** — সর্বনিম্ন/সর্বোচ্চ/গড় দাম ও বিভাগভিত্তিক বাজারের দামের তালিকা।
5. **Authentication** — BetterAuth দিয়ে সাইন ইন/সাইন আপ, সোশ্যাল লগইন, প্রোফাইল ও নাম আপডেট।
6. **Skeleton loaders, 404 পেজ ও ফুল রেসপনসিভ ডিজাইন** (মোবাইল, ট্যাবলেট, ডেস্কটপ)।

## 🚀 Getting Started

```bash
npm install
cp .env.example .env.local   # মানগুলো পূরণ করুন
npm run dev
```

### Environment variables

| Variable | বিবরণ |
| --- | --- |
| `MONGODB_URI` / `MONGODB_DB` | MongoDB Atlas সংযোগ |
| `BETTER_AUTH_SECRET` | লম্বা র‍্যান্ডম স্ট্রিং |
| `BETTER_AUTH_URL` | অ্যাপের URL (লোকালে `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET` | সোশ্যাল লগইনের জন্য (ঐচ্ছিক) |

Social callback URL: `<APP_URL>/api/auth/callback/google` ও `<APP_URL>/api/auth/callback/github`
