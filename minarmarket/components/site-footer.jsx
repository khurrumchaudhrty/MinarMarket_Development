import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-gray-900">About Us</h3>
            <Link href="/aboutus" className="text-sm text-gray-600 hover:text-[#872CE4] transition-colors">
              About Minar Market
            </Link>
            <Link href="/careers" className="text-sm text-gray-600 hover:text-[#872CE4] transition-colors">
              Careers
            </Link>
            <Link href="/press" className="text-sm text-gray-600 hover:text-[#872CE4] transition-colors">
              Press
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Support</h3>
            <Link href="/safety-center" className="text-sm text-gray-600 hover:text-[#872CE4] transition-colors">
              Safety Center
            </Link>
            <Link href="/community-guidelines" className="text-sm text-gray-600 hover:text-[#872CE4] transition-colors">
              Community Guidelines
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Legal</h3>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-[#872CE4] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/termsofservice" className="text-sm text-gray-600 hover:text-[#872CE4] transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookiepolicy" className="text-sm text-gray-600 hover:text-[#872CE4] transition-colors">
              Cookie Policy
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Install App</h3>
            <p className="text-sm text-gray-600">Coming soon to iOS and Android</p>
            <div className="flex gap-3 mt-2">
              <button className="h-10 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm text-gray-600">
                App Store
              </button>
              <button className="h-10 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm text-gray-600">
                Google Play
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between py-6">
            <span className="text-sm text-gray-500 mb-4 sm:mb-0">© 2025 Minar Market. All rights reserved.</span>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#872CE4] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-[#872CE4] transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-sm text-gray-500 hover:text-[#872CE4] transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

