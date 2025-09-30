export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
                <div className="flex items-center gap-6">
                    <span>Conditions to Use</span>
                    <span>Privacy Notice</span>
                    <span>Interest-based Ads</span>
                </div>

                <div className="text-sm">
                    &copy; {new Date().getFullYear()} MyApp. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
