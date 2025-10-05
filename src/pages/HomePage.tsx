import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Brain, Users, Shield, Sparkles, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="relative overflow-x-hidden bg-gradient-to-b from-amber-50 to-white">
      {/* 🌟 Animated Glowing Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Sparkles, Shield, Scale, Brain].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-400/40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [0.9, 1.1, 0.9],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            style={{
              top: `${20 + i * 20}%`,
              left: `${10 + i * 25}%`,
            }}
          >
            <Icon className="w-24 h-24 blur-md drop-shadow-[0_0_25px_#fbbf24]" />
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 min-h-screen space-y-12">
        {/* Beige Glass Background */}
        <div className="absolute inset-0 bg-amber-100/40 backdrop-blur-xl border border-amber-200/40 rounded-[3rem] shadow-inner mx-8 my-10"></div>

        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl relative z-10"
        >
          <h1 className="text-7xl md:text-8xl font-extrabold text-black mb-6 leading-tight drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)]">
            Law<span className="text-amber-600">GPT</span>
          </h1>
          <p className="text-2xl text-amber-900 mb-4">
            Simplifying Legal Documents with <br />
            <span className="font-semibold text-amber-700">
              AI-Powered Analysis
            </span>
          </p>
          <p className="text-lg text-stone-800 mb-10">
            Understanding legal documents shouldn’t require a law degree.  
            Our platform transforms complex legal text into clear, simple language.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex flex-wrap justify-center gap-6 relative z-10"
        >
          <Link
            to="/signup"
            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-transform duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/help"
            className="border-2 border-amber-700 text-amber-700 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-amber-50 transition-transform duration-300 flex items-center space-x-2"
          >
            <span>Learn More</span>
          </Link>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full max-w-3xl flex flex-col items-center relative z-10"
        >
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-amber-200 bg-amber-50/60 backdrop-blur-md">
            <video
              className="w-full h-full object-cover"
              controls
              poster="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800"
            >
              <source
                src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Badges */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {[{ icon: Shield, label: "Secure & Private" }, { icon: Sparkles, label: "AI-Powered" }, { icon: Users, label: "User-Friendly" }].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-amber-50/80 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-amber-200"
              >
                <badge.icon className="h-5 w-5 text-amber-700" />
                <span className="text-sm font-medium text-amber-900">{badge.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-amber-50 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-black mb-8">
            Why Choose <span className="text-amber-700">LawGPT?</span>
          </h2>
          <p className="text-lg text-stone-800 mb-16 max-w-3xl mx-auto">
            Empowering you with clarity and confidence — making law understandable for everyone.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[{ icon: FileText, title: "Document Analysis", desc: "Upload any legal document and get instant, simple explanations of complex terms." },
              { icon: Brain, title: "AI-Powered Insights", desc: "Our NLP engine extracts important clauses and translates them into plain English." },
              { icon: Users, title: "Accessible to All", desc: "You don’t need a legal background. We make legal understanding effortless." }].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg border border-amber-200"
              >
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-5 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-stone-700 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-800 to-amber-900 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Simplify Your Legal Documents?
        </h2>
        <p className="text-xl text-amber-200 mb-8">
          Join thousands of users who trust LawGPT for clear legal understanding.
        </p>
        <Link
          to="/signup"
          className="bg-gradient-to-r from-amber-400 to-amber-500 text-black px-10 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-all duration-300 inline-flex items-center space-x-2 shadow-lg hover:scale-105"
        >
          <span>Start Your Free Trial</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
