import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ComingSoonPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] px-4 text-center">
            {/* Illustration */}
            <div className="relative mb-8 flex justify-center items-center w-64 h-64 rounded-full bg-[#f0fbf6]">
                <div className="relative z-10 w-48 h-32 flex flex-col items-center justify-end pb-2">
                    {/* Top circle with pause */}
                    <div className="absolute -top-6 w-14 h-14 bg-white border-[3px] border-[#1e293b] rounded-full flex items-center justify-center z-20">
                        <div className="flex gap-1.5">
                            <div className="w-1.5 h-5 bg-[#2DB78A] rounded-sm"></div>
                            <div className="w-1.5 h-5 bg-[#2DB78A] rounded-sm"></div>
                        </div>
                    </div>

                    {/* Barrier */}
                    <div className="relative w-40 h-10 border-[3px] border-[#1e293b] bg-white overflow-hidden rounded-sm flex z-10">
                        {/* Diagonal stripes */}
                        <div className="w-full h-full flex transform -skew-x-[30deg] scale-150 ml-4 gap-4">
                            <div className="w-8 h-full bg-[#2DB78A]"></div>
                            <div className="w-8 h-full bg-[#2DB78A]"></div>
                            <div className="w-8 h-full bg-[#2DB78A]"></div>
                            <div className="w-8 h-full bg-[#2DB78A]"></div>
                        </div>
                    </div>

                    {/* Legs */}
                    <div className="flex justify-between w-32 px-1">
                        <div className="w-3 h-10 border-x-[3px] border-b-[3px] border-[#1e293b] bg-[#f8fafc]"></div>
                        <div className="w-3 h-10 border-x-[3px] border-b-[3px] border-[#1e293b] bg-[#f8fafc]"></div>
                    </div>
                    {/* Base of legs */}
                    <div className="flex justify-between w-36 px-0 -mt-1 z-20">
                        <div className="w-6 h-2.5 border-[3px] border-[#1e293b] bg-[#f8fafc] rounded-sm"></div>
                        <div className="w-6 h-2.5 border-[3px] border-[#1e293b] bg-[#f8fafc] rounded-sm"></div>
                    </div>
                </div>

                {/* Decorative sparkles */}
                <div className="absolute top-12 left-12 text-[#2DB78A] opacity-60 text-lg">✦</div>
                <div className="absolute top-8 right-16 text-[#2DB78A] opacity-60 text-sm">✦</div>
                <div className="absolute bottom-16 right-10 text-[#2DB78A] opacity-60 text-xs">✦</div>
                <div className="absolute bottom-12 left-8 text-[#2DB78A] opacity-60 text-sm">✦</div>

                {/* Small dots */}
                <div className="absolute top-24 left-6 w-1.5 h-1.5 bg-[#2DB78A] rounded-full opacity-40"></div>
                <div className="absolute bottom-20 right-8 w-1 h-1 bg-[#2DB78A] rounded-full opacity-40"></div>
            </div>

            {/* Text Content */}
            <h1 className="text-[28px] font-bold text-[#1e293b] mb-4 flex items-center gap-2">
                This module is coming soon 🚧
            </h1>

            <p className="text-[#64748b] max-w-[400px] mx-auto mb-10 text-[15px] leading-relaxed">
                We are currently working on this feature.<br />
                It will be available in future updates.
            </p>

            <div className="w-full max-w-sm border-t border-[#e8ecf1] mb-10"></div>

            {/* Button */}
            <Link
                href="/vendor"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2DB78A] text-white font-medium rounded-lg hover:bg-[#26a078] transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Go back to Vendor Management
            </Link>

            {/* Footer */}
            <div className=" mt-6 text-xs font-medium text-[#94a3b8]">
                © 2026 Sterling Cloud. All rights reserved.
            </div>
        </div>
    )
}
