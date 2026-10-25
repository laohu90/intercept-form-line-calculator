import React, { useState } from 'react';
import { X, ShieldCheck, BookOpen, FileText, Send, CheckCircle, Mail, Award, Users } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

export type ModalType = 'about' | 'privacy' | 'terms' | 'contact' | null;

interface TrustModalsProps {
  type: ModalType;
  onClose: () => void;
  language: Language;
}

export const TrustModals: React.FC<TrustModalsProps> = ({ type, onClose, language }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!type) return null;
  const t = translations[language];

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackText('');
      setFeedbackEmail('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-800 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            {type === 'about' && <Award className="w-5 h-5 text-indigo-600" />}
            {type === 'privacy' && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-blue-600" />}
            {type === 'contact' && <Mail className="w-5 h-5 text-amber-600" />}
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {type === 'about' && t.trust.about}
              {type === 'privacy' && t.trust.privacy}
              {type === 'terms' && t.trust.terms}
              {type === 'contact' && t.trust.contact}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm leading-relaxed text-slate-700">
          {/* About Us */}
          {type === 'about' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <span className="font-bold text-indigo-950 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  {t.trust.authorTitle}
                </span>
                <p className="text-slate-700">{t.trust.authorBio}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-slate-600" />
                  {t.trust.academicMethodology}
                </h3>
                <p className="text-slate-600 leading-relaxed">{t.trust.editorialBoard}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500">
                <strong>Formula CalcKit Project:</strong> High-precision educational tool developed for high school Cartesian coordinate geometry, algebraic polynomial factorizations, and college entrance examination standards (SAT, AP Precalculus, Gaokao, Selectividad, Baccalauréat, ENEM).
              </div>
            </div>
          )}

          {/* Privacy Policy */}
          {type === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Zero-Knowledge Client-Side Computation
                </span>
                <p className="text-slate-700">{t.trust.privacyStatement}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">1. Data Storage & Tracking</h3>
                <p className="text-slate-600">
                  This website does not store student calculation history or personal data on remote databases. All math parsing, KaTeX formula conversions, and canvas rendering happen in the visitor's local web browser engine.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">2. Cookies & Third-Party Services</h3>
                <p className="text-slate-600">
                  We use minimal anonymous session cookies solely to preserve your preferred language settings (e.g. English, Spanish, French, Portuguese, Chinese) and standard CDN caching for LaTeX fonts (KaTeX).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">3. GDPR & CCPA Compliance</h3>
                <p className="text-slate-600">
                  Under the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), users have the right to visit and utilize this application without tracking or sale of personal information.
                </p>
              </div>
            </div>
          )}

          {/* Terms of Service */}
          {type === 'terms' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                <span className="font-bold text-blue-950 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Educational Free Use License
                </span>
                <p className="text-slate-700">{t.trust.termsStatement}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">1. Educational Purpose & Disclaimer</h3>
                <p className="text-slate-600">
                  This platform is designed to assist secondary school mathematics instruction, homework graph verification, and self-study. While all formulas and derivations are rigorously reviewed, students should always refer to their school and exam board requirements for official exam submissions.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">2. Intellectual Property & Citation</h3>
                <p className="text-slate-600">
                  All mathematical visual layouts, step-by-step algorithms, and multi-language pedagogical explanations are provided under open educational fair-use principles.
                </p>
              </div>
            </div>
          )}

          {/* Contact & Feedback */}
          {type === 'contact' && (
            <div className="space-y-4">
              <p className="text-slate-600">{t.trust.feedbackCommitment}</p>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                <div>
                  <strong className="text-slate-800">Support & Academic Desk:</strong>{' '}
                  <span className="font-mono text-slate-600">academic@formulacalckit.com</span>
                </div>
                <div>
                  <strong className="text-slate-800">Official Domain:</strong>{' '}
                  <span className="font-mono text-slate-600">https://intercept-form-line-calculator.formulacalckit.com</span>
                </div>
              </div>

              {feedbackSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{t.trust.feedbackSent}</span>
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-3">
                  <div>
                    <label htmlFor="feedback-email-input" className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Email (Optional, if you wish to receive a reply):
                    </label>
                    <input
                      id="feedback-email-input"
                      type="email"
                      value={feedbackEmail}
                      onChange={(e) => setFeedbackEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label htmlFor="feedback-text-input" className="block text-xs font-semibold text-slate-700 mb-1">
                      Message / Question / Feedback:
                    </label>
                    <textarea
                      id="feedback-text-input"
                      rows={4}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder={t.trust.feedbackPlaceholder}
                      required
                      className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.trust.sendFeedback}</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300/80 text-slate-800 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            {t.trust.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustModals;
