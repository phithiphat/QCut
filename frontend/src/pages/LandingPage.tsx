import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
                                Book Your Next <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                    Perfect Cut
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Skip the queue and look your best. The modern way to find and book top-rated barbers in your area.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/register"
                                    className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-8 py-4 bg-white text-gray-700 rounded-full font-bold text-lg hover:bg-gray-50 transition transform hover:scale-105 shadow-md border border-gray-100"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/30 blur-3xl animate-pulse"></div>
                    <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-200/30 blur-3xl animate-pulse delay-1000"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose QCut?</h2>
                        <p className="text-gray-500 text-lg">Experience the future of barber booking.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: "⚡",
                                title: "Instant Booking",
                                description: "Book your appointment in seconds. No phone calls, no waiting on hold."
                            },
                            {
                                icon: "📅",
                                title: "Real-time Availability",
                                description: "See exactly when your favorite barber is free and choose a slot that fits your schedule."
                            },
                            {
                                icon: "⭐",
                                title: "Top Rated Barbers",
                                description: "Discover the best local talent with verified reviews and ratings."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                            >
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
                                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-6">✂️ QCut</h2>
                    <p className="text-gray-400 mb-8">Making the world look better, one cut at a time.</p>
                    <div className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} QCut. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
