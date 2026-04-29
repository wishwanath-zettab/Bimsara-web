import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import hamburger from "../../assets/icons/hamburger.webp";
import config from "../../config";
import "./ContactFromStyles.scss";

const ContactFrom = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("94");
  const [number2, setNumber2] = useState("");
  const [want, setWant] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const form = useRef();
  const getContent = () => {
    if (props.content) {
      return "We would like to have an obligation free discussion with you regarding our property selling process.";
    }
    if (props.content2) {
      return "We would like to have an obligation free discussion with you regarding our property buying process.";
    } else if (props.content3) {
      return "I would like to know more about the services";
    } else {
      return "I would like to know more about the services";
    }
  };
  const onChange = (e) => {
    if (e.target.checked) {
      setWant(e.target.value);
      setErrorMsg("");
    }
  };
  const clearFieldError = (setter) => (value) => {
    setter(value);
    setErrorMsg("");
  };
  const showError = (message) => {
    setErrorMsg(message);
    setLoading(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setSuccessMsg(false);
    setErrorMsg("");
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const phone = number + number2.trim();
    if (trimmedName !== "" && trimmedEmail !== "" && number2.trim() !== "" && type !== "" && want !== "") {
      console.log(trimmedName + " | " + trimmedEmail + " | " + phone + " | " + type + " | " + want + " | ");
      var name_re = /^[a-z ,.'-]+$/i;
      if (name_re.test(trimmedName)) {
        var email_re = /\S+@\S+\.\S+/;
        if (email_re.test(trimmedEmail)) {
          if (number2.length >= 9 && number2.length <= 10) {
            const value = {
              name: trimmedName,
              email: trimmedEmail,
              number: phone,
              type: type,
              purpose: want,
            };
            emailjs
              .send(
                config.emailJs.SERVICE_ID,
                config.emailJs.TEMPLATE_ID,
                value,
                config.emailJs.PUBLIC_KEY
              )
              .then(
                function (response) {
                  console.log("SUCCESS!", response.status, response.text);
                  setName("");
                  setEmail("");
                  setType("");
                  setWant("");
                  setNumber("94");
                  setNumber2("");
                  setLoading(false);
                  setSuccessMsg(true);
                  setTimeout(() => {
                    setSuccessMsg(false);
                    if (props.setContactModal) {
                      props.setContactModal(false);
                    }
                  }, 3500);
                },
                function (error) {
                  console.log("FAILED...", error);
                  showError("An error occurred. Please refresh the page and try again.");
                }
              );
          } else {
            console.log("Please enter a valid phone number!");
            showError("Please enter a valid contact number.");
          }
        } else {
          console.log("Please enter a valid email address!");
          showError("Please enter a valid email address.");
        }
      } else {
        console.log("Please enter a valid name!");
        showError("Please enter a valid name.");
      }
    } else {
      console.log("Check again! All the fields should be properly filled.");
      showError("Check again. All fields should be properly filled.");
    }
  };
  return (
    <div className="contactForm">
      <div className="contact-form-header">{getContent()}</div>
      <div className="form" ref={form}>
        <div className="input-container">
          <div className="label">
            {props?.from && props?.from === "home" ? "Name" : "Name"}
          </div>
          <input
            type="text"
            className="input"
            onChange={(e) => clearFieldError(setName)(e.target.value)}
            value={name}
          />
        </div>
        <div className="input-container">
          <div className="label">Email Address</div>
          <input
            type="email"
            className="input"
            onChange={(e) => clearFieldError(setEmail)(e.target.value)}
            value={email}
          />
        </div>
        <div className="input-container">
          <div className="label">Contact Number</div>
          <div className="phone-input">
            <select value={number} onChange={(e) => setNumber(e.target.value)} className="input-1">
              <option value="94">+94</option>
              <option value="93">+93</option>
              <option value="355">+355</option>
              <option value="213">+213</option>
              <option value="1684">+1684</option>
              <option value="376">+376</option>
              <option value="244">+244</option>
              <option value="1264">+1264</option>
              <option value="672">+672</option>
              <option value="1268">+1268</option>
              <option value="54">+54</option>
              <option value="374">+374</option>
              <option value="297">+297</option>
              <option value="61">+61</option>
              <option value="43">+43</option>
              <option value="994">+994</option>
              <option value="1242">+1242</option>
              <option value="973">+973</option>
              <option value="880">+880</option>
              <option value="1246">+1246</option>
              <option value="375">+375</option>
              <option value="32">+32</option>
              <option value="501">+501</option>
              <option value="229">+229</option>
              <option value="1441">+1441</option>
              <option value="975">+975</option>
              <option value="591">+591</option>
              <option value="387">+387</option>
              <option value="267">+267</option>
              <option value="55">+55</option>
              <option value="246">+246</option>
              <option value="1284">+1284</option>
              <option value="673">+673</option>
              <option value="359">+359</option>
              <option value="226">+226</option>
              <option value="257">+257</option>
              <option value="855">+855</option>
              <option value="237">+237</option>
              <option value="1">+1</option>
              <option value="238">+238</option>
              <option value="1345">+1345</option>
              <option value="236">+236</option>
              <option value="235">+235</option>
              <option value="56">+56</option>
              <option value="86">+86</option>
              <option value="61">+61</option>
              <option value="61">+61</option>
              <option value="57">+57</option>
              <option value="269">+269</option>
              <option value="682">+682</option>
              <option value="506">+506</option>
              <option value="385">+385</option>
              <option value="53">+53</option>
              <option value="599">+599</option>
              <option value="357">+357</option>
              <option value="420">+420</option>
              <option value="243">+243</option>
              <option value="45">+45</option>
              <option value="253">+253</option>
              <option value="1767">+1767</option>
              <option value="1809">+1809</option>
              <option value="670">+670</option>
              <option value="593">+593</option>
              <option value="20">+20</option>
              <option value="503">+503</option>
              <option value="240">+240</option>
              <option value="291">+291</option>
              <option value="372">+372</option>
              <option value="251">+251</option>
              <option value="500">+500</option>
              <option value="298">+298</option>
              <option value="679">+679</option>
              <option value="358">+358</option>
              <option value="33">+33</option>
              <option value="689">+689</option>
              <option value="241">+241</option>
              <option value="220">+220</option>
              <option value="995">+995</option>
              <option value="49">+49</option>
              <option value="233">+233</option>
              <option value="350">+350</option>
              <option value="30">+30</option>
              <option value="299">+299</option>
              <option value="1473">+1473</option>
              <option value="1671">+1671</option>
              <option value="502">+502</option>
              <option value="44-1481">+44-1481</option>
              <option value="224">+224</option>
              <option value="245">+245</option>
              <option value="592">+592</option>
              <option value="509">+509</option>
              <option value="504">+504</option>
              <option value="852">+852</option>
              <option value="36">+36</option>
              <option value="354">+354</option>
              <option value="91">+91</option>
              <option value="62">+62</option>
              <option value="98">+98</option>
              <option value="964">+964</option>
              <option value="353">+353</option>
              <option value="44-1624">+44-1624</option>
              <option value="972">+972</option>
              <option value="39">+39</option>
              <option value="225">+225</option>
              <option value="1876">+1876</option>
              <option value="81">+81</option>
              <option value="44-1534">+44-1534</option>
              <option value="962">+962</option>
              <option value="7">+7</option>
              <option value="254">+254</option>
              <option value="686">+686</option>
              <option value="383">+383</option>
              <option value="965">+965</option>
              <option value="996">+996</option>
              <option value="856">+856</option>
              <option value="371">+371</option>
              <option value="961">+961</option>
              <option value="266">+266</option>
              <option value="231">+231</option>
              <option value="218">+218</option>
              <option value="423">+423</option>
              <option value="370">+370</option>
              <option value="352">+352</option>
              <option value="853">+853</option>
              <option value="389">+389</option>
              <option value="261">+261</option>
              <option value="265">+265</option>
              <option value="60">+60</option>
              <option value="960">+960</option>
              <option value="223">+223</option>
              <option value="356">+356</option>
              <option value="692">+692</option>
              <option value="222">+222</option>
              <option value="230">+230</option>
              <option value="262">+262</option>
              <option value="52">+52</option>
              <option value="691">+691</option>
              <option value="373">+373</option>
              <option value="377">+377</option>
              <option value="976">+976</option>
              <option value="382">+382</option>
              <option value="1664">+1664</option>
              <option value="212">+212</option>
              <option value="258">+258</option>
              <option value="95">+95</option>
              <option value="264">+264</option>
              <option value="674">+674</option>
              <option value="977">+977</option>
              <option value="31">+31</option>
              <option value="599">+599</option>
              <option value="687">+687</option>
              <option value="64">+64</option>
              <option value="505">+505</option>
              <option value="227">+227</option>
              <option value="234">+234</option>
              <option value="683">+683</option>
              <option value="850">+850</option>
              <option value="1670">+1670</option>
              <option value="47">+47</option>
              <option value="968">+968</option>
              <option value="92">+92</option>
              <option value="680">+680</option>
              <option value="970">+970</option>
              <option value="507">+507</option>
              <option value="675">+675</option>
              <option value="595">+595</option>
              <option value="51">+51</option>
              <option value="63">+63</option>
              <option value="64">+64</option>
              <option value="48">+48</option>
              <option value="351">+351</option>
              <option value="1787">+1787</option>
              <option value="974">+974</option>
              <option value="242">+242</option>
              <option value="262">+262</option>
              <option value="40">+40</option>
              <option value="7">+7</option>
              <option value="250">+250</option>
              <option value="590">+590</option>
              <option value="290">+290</option>
              <option value="1869">+1869</option>
              <option value="1758">+1758</option>
              <option value="590">+590</option>
              <option value="508">+508</option>
              <option value="1784">+1784</option>
              <option value="685">+685</option>
              <option value="378">+378</option>
              <option value="239">+239</option>
              <option value="966">+966</option>
              <option value="221">+221</option>
              <option value="381">+381</option>
              <option value="248">+248</option>
              <option value="232">+232</option>
              <option value="65">+65</option>
              <option value="1721">+1721</option>
              <option value="421">+421</option>
              <option value="386">+386</option>
              <option value="677">+677</option>
              <option value="252">+252</option>
              <option value="27">+27</option>
              <option value="82">+82</option>
              <option value="211">+211</option>
              <option value="34">+34</option>
              <option value="249">+249</option>
              <option value="597">+597</option>
              <option value="47">+47</option>
              <option value="268">+268</option>
              <option value="46">+46</option>
              <option value="41">+41</option>
              <option value="963">+963</option>
              <option value="886">+886</option>
              <option value="992">+992</option>
              <option value="255">+255</option>
              <option value="66">+66</option>
              <option value="228">+228</option>
              <option value="690">+690</option>
              <option value="676">+676</option>
              <option value="1868">+1868</option>
              <option value="216">+216</option>
              <option value="90">+90</option>
              <option value="993">+993</option>
              <option value="1649">+1649</option>
              <option value="688">+688</option>
              <option value="1340">+1340</option>
              <option value="256">+256</option>
              <option value="380">+380</option>
              <option value="971">+971</option>
              <option value="44">+44</option>
              <option value="1">+1</option>
              <option value="598">+598</option>
              <option value="998">+998</option>
              <option value="678">+678</option>
              <option value="379">+379</option>
              <option value="58">+58</option>
              <option value="84">+84</option>
              <option value="681">+681</option>
              <option value="212">+212</option>
              <option value="967">+967</option>
              <option value="260">+260</option>
              <option value="263">+263</option>
            </select>
            <input
              type="text"
              className="input-2"
              maxLength="10"
              onChange={(e) => clearFieldError(setNumber2)(e.target.value)}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              value={number2}
            />
          </div>
        </div>
        <div className="radio-container">
          <div className="label">I want to</div>
          <div className="radio-cont">
            <div className="container">
              <input
                type="radio"
                value="sell"
                checked={want === "sell"}
                onChange={onChange}
                name="want"
              />
              <span className="checkmark"></span>
              <span className="lbl">Sell</span>
            </div>
            <div className="container">
              <input
                type="radio"
                value="rentOut"
                checked={want === "rentOut"}
                onChange={onChange}
                name="want"
              />
              <span className="checkmark"></span>
              <span className="lbl">Rent Out</span>
            </div>
          </div>
          <div className="radio-cont">
            <div className="container">
              <input
                type="radio"
                value="buy"
                checked={want === "buy"}
                onChange={onChange}
                name="want"
              />
              <span className="checkmark"></span>
              <span className="lbl">Buy</span>
            </div>
            <div className="container">
              <input
                type="radio"
                value="rentOccupy"
                checked={want === "rentOccupy"}
                onChange={onChange}
                name="want"
              />
              <span className="checkmark"></span>
              <span className="lbl">Rent Occupy</span>
            </div>
          </div>
        </div>
        <div className="custom-select">
          <select value={type} onChange={(e) => clearFieldError(setType)(e.target.value)} id="property_type">
            <option value="">Property Type</option>
            <option value="House">House</option>
            <option value="Land">Land</option>
            <option value="Apartment">Apartment</option>
            <option value="Commercial Property">Commercial Property</option>
          </select>
          <img alt="" src={hamburger} />
        </div>
        {errorMsg && <div className="form-message error-msg">{errorMsg}</div>}
        {successMsg && (
          <div className="form-message success-msg">
            <div className="success-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="contactSuccessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b6e02a" />
                    <stop offset="50%" stopColor="#f2994a" />
                    <stop offset="100%" stopColor="#56ccf2" />
                  </linearGradient>
                </defs>
                <circle cx="12" cy="12" r="10.5" stroke="url(#contactSuccessGradient)" strokeWidth="1.5" />
                <path d="M19.5 5.5L13.6 18L10.7 13.3L5.5 10.8L19.5 5.5Z" stroke="url(#contactSuccessGradient)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <span>Your message successfully received!</span>
          </div>
        )}
        <div onClick={onSubmit} className="contact-btn btn btn-push-animate">
          {loading ? <div className="loader" /> : " Contact Me"}
        </div>
      </div>
    </div >
  );
};
export default ContactFrom;
