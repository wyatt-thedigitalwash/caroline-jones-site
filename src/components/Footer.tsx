"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/carolinejonesmusic",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/carolinejones",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@carolinejonesmusic",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCB8e-AfK22U3VvLlwBqqXKA",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setErrorMsg(json?.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMsg('Unable to connect. Please try again later.');
      setStatus('error');
    }
  }

  return (
    <footer id="subscribe" aria-label="Footer and subscribe" className="bg-[#5D3635] text-[#DDE2CD] py-16 px-6 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
        <Image
          src="/logos/CarolineJones_LogoWhite.png"
          alt="Caroline Jones"
          width={225}
          height={75}
          sizes="225px"
          className="h-auto w-[225px]"
        />

        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} (opens in new tab)`}
              className="flex items-center justify-center min-h-[44px] min-w-[44px] text-[#DDE2CD] transition-opacity hover:opacity-70"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="w-full">
          {status === 'success' ? (
            <p className="text-center font-[family-name:var(--font-heading)] text-base italic text-[#DDE2CD]" role="status" aria-live="polite">
              Thank you for subscribing.
            </p>
          ) : (
            <form onSubmit={handleSubmit} aria-label="Subscribe to newsletter">
              {/* Honeypot field -- hidden from real users */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="subscribe-website">Website</label>
                <input type="text" id="subscribe-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              {status === 'error' && (
                <p className="mb-4 text-center font-[family-name:var(--font-body)] text-sm text-red-300" role="alert">
                  {errorMsg}
                </p>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="subscribe-email" className="sr-only">Email</label>
                  <input
                    id="subscribe-email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    aria-required="true"
                    className="w-full border border-[#DDE2CD]/50 bg-transparent px-5 py-4 font-[family-name:var(--font-body)] text-sm text-[#DDE2CD] outline-none placeholder:text-[#DDE2CD]/40 focus-visible:border-[#DDE2CD]"
                  />
                </div>
                <div>
                  <label htmlFor="subscribe-phone" className="sr-only">Phone</label>
                  <input
                    id="subscribe-phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full border border-[#DDE2CD]/50 bg-transparent px-5 py-4 font-[family-name:var(--font-body)] text-sm text-[#DDE2CD] outline-none placeholder:text-[#DDE2CD]/40 focus-visible:border-[#DDE2CD]"
                  />
                </div>
                <div>
                  <label htmlFor="subscribe-zip" className="sr-only">Zip Code</label>
                  <input
                    id="subscribe-zip"
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    className="w-full border border-[#DDE2CD]/50 bg-transparent px-5 py-4 font-[family-name:var(--font-body)] text-sm text-[#DDE2CD] outline-none placeholder:text-[#DDE2CD]/40 focus-visible:border-[#DDE2CD]"
                  />
                </div>
                <div>
                  <label htmlFor="subscribe-country" className="sr-only">Country</label>
                  <select
                    id="subscribe-country"
                    name="country"
                    defaultValue=""
                    className="w-full border border-[#DDE2CD]/50 bg-transparent px-5 py-4 font-[family-name:var(--font-body)] text-sm text-[#DDE2CD] outline-none focus-visible:border-[#DDE2CD] [&>option]:bg-[#5D3635] [&>option]:text-[#DDE2CD]"
                  >
                    <option value="" disabled className="text-[#DDE2CD]/40">Country</option>
                    <option value="US">United States</option>
                    <option value="AF">Afghanistan</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AG">Antigua and Barbuda</option>
                    <option value="AR">Argentina</option>
                    <option value="AM">Armenia</option>
                    <option value="AU">Australia</option>
                    <option value="AT">Austria</option>
                    <option value="AZ">Azerbaijan</option>
                    <option value="BS">Bahamas</option>
                    <option value="BH">Bahrain</option>
                    <option value="BD">Bangladesh</option>
                    <option value="BB">Barbados</option>
                    <option value="BY">Belarus</option>
                    <option value="BE">Belgium</option>
                    <option value="BZ">Belize</option>
                    <option value="BJ">Benin</option>
                    <option value="BT">Bhutan</option>
                    <option value="BO">Bolivia</option>
                    <option value="BA">Bosnia and Herzegovina</option>
                    <option value="BW">Botswana</option>
                    <option value="BR">Brazil</option>
                    <option value="BN">Brunei</option>
                    <option value="BG">Bulgaria</option>
                    <option value="BF">Burkina Faso</option>
                    <option value="BI">Burundi</option>
                    <option value="CV">Cabo Verde</option>
                    <option value="KH">Cambodia</option>
                    <option value="CM">Cameroon</option>
                    <option value="CA">Canada</option>
                    <option value="CF">Central African Republic</option>
                    <option value="TD">Chad</option>
                    <option value="CL">Chile</option>
                    <option value="CN">China</option>
                    <option value="CO">Colombia</option>
                    <option value="KM">Comoros</option>
                    <option value="CG">Congo</option>
                    <option value="CR">Costa Rica</option>
                    <option value="HR">Croatia</option>
                    <option value="CU">Cuba</option>
                    <option value="CY">Cyprus</option>
                    <option value="CZ">Czech Republic</option>
                    <option value="DK">Denmark</option>
                    <option value="DJ">Djibouti</option>
                    <option value="DM">Dominica</option>
                    <option value="DO">Dominican Republic</option>
                    <option value="EC">Ecuador</option>
                    <option value="EG">Egypt</option>
                    <option value="SV">El Salvador</option>
                    <option value="GQ">Equatorial Guinea</option>
                    <option value="ER">Eritrea</option>
                    <option value="EE">Estonia</option>
                    <option value="SZ">Eswatini</option>
                    <option value="ET">Ethiopia</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finland</option>
                    <option value="FR">France</option>
                    <option value="GA">Gabon</option>
                    <option value="GM">Gambia</option>
                    <option value="GE">Georgia</option>
                    <option value="DE">Germany</option>
                    <option value="GH">Ghana</option>
                    <option value="GR">Greece</option>
                    <option value="GD">Grenada</option>
                    <option value="GT">Guatemala</option>
                    <option value="GN">Guinea</option>
                    <option value="GW">Guinea-Bissau</option>
                    <option value="GY">Guyana</option>
                    <option value="HT">Haiti</option>
                    <option value="HN">Honduras</option>
                    <option value="HU">Hungary</option>
                    <option value="IS">Iceland</option>
                    <option value="IN">India</option>
                    <option value="ID">Indonesia</option>
                    <option value="IR">Iran</option>
                    <option value="IQ">Iraq</option>
                    <option value="IE">Ireland</option>
                    <option value="IL">Israel</option>
                    <option value="IT">Italy</option>
                    <option value="JM">Jamaica</option>
                    <option value="JP">Japan</option>
                    <option value="JO">Jordan</option>
                    <option value="KZ">Kazakhstan</option>
                    <option value="KE">Kenya</option>
                    <option value="KI">Kiribati</option>
                    <option value="KW">Kuwait</option>
                    <option value="KG">Kyrgyzstan</option>
                    <option value="LA">Laos</option>
                    <option value="LV">Latvia</option>
                    <option value="LB">Lebanon</option>
                    <option value="LS">Lesotho</option>
                    <option value="LR">Liberia</option>
                    <option value="LY">Libya</option>
                    <option value="LI">Liechtenstein</option>
                    <option value="LT">Lithuania</option>
                    <option value="LU">Luxembourg</option>
                    <option value="MG">Madagascar</option>
                    <option value="MW">Malawi</option>
                    <option value="MY">Malaysia</option>
                    <option value="MV">Maldives</option>
                    <option value="ML">Mali</option>
                    <option value="MT">Malta</option>
                    <option value="MH">Marshall Islands</option>
                    <option value="MR">Mauritania</option>
                    <option value="MU">Mauritius</option>
                    <option value="MX">Mexico</option>
                    <option value="FM">Micronesia</option>
                    <option value="MD">Moldova</option>
                    <option value="MC">Monaco</option>
                    <option value="MN">Mongolia</option>
                    <option value="ME">Montenegro</option>
                    <option value="MA">Morocco</option>
                    <option value="MZ">Mozambique</option>
                    <option value="MM">Myanmar</option>
                    <option value="NA">Namibia</option>
                    <option value="NR">Nauru</option>
                    <option value="NP">Nepal</option>
                    <option value="NL">Netherlands</option>
                    <option value="NZ">New Zealand</option>
                    <option value="NI">Nicaragua</option>
                    <option value="NE">Niger</option>
                    <option value="NG">Nigeria</option>
                    <option value="KP">North Korea</option>
                    <option value="MK">North Macedonia</option>
                    <option value="NO">Norway</option>
                    <option value="OM">Oman</option>
                    <option value="PK">Pakistan</option>
                    <option value="PW">Palau</option>
                    <option value="PA">Panama</option>
                    <option value="PG">Papua New Guinea</option>
                    <option value="PY">Paraguay</option>
                    <option value="PE">Peru</option>
                    <option value="PH">Philippines</option>
                    <option value="PL">Poland</option>
                    <option value="PT">Portugal</option>
                    <option value="QA">Qatar</option>
                    <option value="RO">Romania</option>
                    <option value="RU">Russia</option>
                    <option value="RW">Rwanda</option>
                    <option value="KN">Saint Kitts and Nevis</option>
                    <option value="LC">Saint Lucia</option>
                    <option value="VC">Saint Vincent and the Grenadines</option>
                    <option value="WS">Samoa</option>
                    <option value="SM">San Marino</option>
                    <option value="ST">Sao Tome and Principe</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="SN">Senegal</option>
                    <option value="RS">Serbia</option>
                    <option value="SC">Seychelles</option>
                    <option value="SL">Sierra Leone</option>
                    <option value="SG">Singapore</option>
                    <option value="SK">Slovakia</option>
                    <option value="SI">Slovenia</option>
                    <option value="SB">Solomon Islands</option>
                    <option value="SO">Somalia</option>
                    <option value="ZA">South Africa</option>
                    <option value="KR">South Korea</option>
                    <option value="SS">South Sudan</option>
                    <option value="ES">Spain</option>
                    <option value="LK">Sri Lanka</option>
                    <option value="SD">Sudan</option>
                    <option value="SR">Suriname</option>
                    <option value="SE">Sweden</option>
                    <option value="CH">Switzerland</option>
                    <option value="SY">Syria</option>
                    <option value="TW">Taiwan</option>
                    <option value="TJ">Tajikistan</option>
                    <option value="TZ">Tanzania</option>
                    <option value="TH">Thailand</option>
                    <option value="TL">Timor-Leste</option>
                    <option value="TG">Togo</option>
                    <option value="TO">Tonga</option>
                    <option value="TT">Trinidad and Tobago</option>
                    <option value="TN">Tunisia</option>
                    <option value="TR">Turkey</option>
                    <option value="TM">Turkmenistan</option>
                    <option value="TV">Tuvalu</option>
                    <option value="UG">Uganda</option>
                    <option value="UA">Ukraine</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="GB">United Kingdom</option>
                    <option value="UY">Uruguay</option>
                    <option value="UZ">Uzbekistan</option>
                    <option value="VU">Vanuatu</option>
                    <option value="VA">Vatican City</option>
                    <option value="VE">Venezuela</option>
                    <option value="VN">Vietnam</option>
                    <option value="YE">Yemen</option>
                    <option value="ZM">Zambia</option>
                    <option value="ZW">Zimbabwe</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="min-h-[44px] w-full bg-[#DDE2CD] py-4 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.25em] text-[#5D3635] transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Submitting...' : 'Subscribe'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center gap-4 border-t border-[#DDE2CD]/20 pt-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <p className="font-[family-name:var(--font-body)] text-xs tracking-wide opacity-70">
          &copy; Borchetta Entertainment Group, LLC d/b/a Big Machine Records
        </p>
        <nav aria-label="Legal links" className="flex flex-wrap justify-center gap-x-5 gap-y-1 font-[family-name:var(--font-body)] text-xs tracking-wide opacity-70 md:justify-end">
          <a href="https://www.bigmachinerecords.com/terms" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">Terms</a>
          <a href="https://www.bigmachinerecords.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">Do Not Sell My Personal Information</a>
          <a href="https://www.bigmachinerecords.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">Privacy</a>
          <a href="https://www.bigmachinerecords.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">Cookie Choices</a>
        </nav>
      </div>
    </footer>
  );
}
