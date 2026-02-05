import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mb-3 shadow-sm hover:shadow-md transition-shadow duration-300">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
            >
                <span className="font-semibold text-charcoal text-lg flex items-center gap-3">
                    <HelpCircle size={18} className="text-pink-500 shrink-0" />
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={20} className="text-gray-400" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "Bagaimana cara untuk menempah tarikh majlis?",
            answer: "Untuk menempah tarikh, anda boleh semak kekosongan melalui borang di bahagian bawah laman web ini, atau hubungi kami terus melalui WhatsApp. Deposit permulaan diperlukan untuk mengunci tarikh pilihan anda."
        },
        {
            question: "Berapa lama tempoh sewaan dewan?",
            answer: "Pakej standard kami merangkumi penggunaan dewan selama 5-6 jam untuk majlis resepsi. Kami juga menyediakan masa tambahan untuk persiapan pelamin dan katering sebelum majlis bermula."
        },
        {
            question: "Adakah katering luar dibenarkan?",
            answer: "Kami menawarkan pakej lengkap termasuk katering premium. Walaubagaimanapun, jika anda mempunyai pilihan katering sendiri, sila bincang dengan pihak pengurusan kami untuk syarat-syarat tertentu."
        },
        {
            question: "Apakah kapasiti maksimum dewan?",
            answer: "Dewan kami boleh memuatkan sehingga 1,000 tetamu secara 'buffet flow' atau sekitar 300-400 tetamu untuk susunan meja bulat (sit-down dinner) pada satu masa."
        },
        {
            question: "Adakah kemudahan parking disediakan?",
            answer: "Ya, kami menyediakan ruang parking yang luas dan selesa untuk tetamu anda, lengkap dengan petugas trafik RELA (untuk pakej tertentu) bagi memastikan kelancaran trafik."
        }
    ];

    return (
        <div className="w-full">
            <div className="mb-8">
                <h3 className="font-serif text-3xl font-bold mb-3 text-charcoal">Soalan Lazim</h3>
                <p className="text-gray-500">Jawapan pantas untuk persoalan umum anda.</p>
            </div>

            <div className="space-y-1">
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                ))}
            </div>

            <div className="mt-8 bg-pink-50 rounded-2xl p-6 border border-pink-100 flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center shrink-0 text-pink-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 mb-1">Masih ada soalan?</h4>
                    <p className="text-sm text-gray-600 mb-3">
                        Jangan ragu untuk hubungi kami. Team kami sedia membantu anda.
                    </p>
                    <a
                        href="https://wa.me/60127707912"
                        target="_blank"
                        rel="noreferrer"
                        className="text-pink-600 font-bold text-sm hover:underline hover:text-pink-700 transition-colors"
                    >
                        WhatsApp Kami Sekarang &rarr;
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
