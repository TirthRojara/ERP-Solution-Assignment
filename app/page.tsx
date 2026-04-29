import AuthShowcase from "@/features/auth/login/components/AuthShowcase";
import LoginCard from "@/features/auth/login/components/LoginCard";

export default function LoginPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100 p-4 gap-6 md:gap-6 md:gap-0">
            {/* Left */}
            <div className="flex items-center justify-center">
                <LoginCard />
            </div>

            {/* Right */}
            <AuthShowcase />
        </div>
    );
}
