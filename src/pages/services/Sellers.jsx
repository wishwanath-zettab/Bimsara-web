import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../../context/SiteDataContext'
import { useIsMobile } from '../../hooks/useIsMobile'
import MobileServiceLayout from '../../components/MobileServiceLayout'
import sellersHeroFull from '../../assets/images/sellers-hero-full.webp'
import roundedArrow from '../../assets/images/rounded-arrow.png'
import isoLogo from '../../assets/images/iso-logo.png'
import safetynetLogo from '../../assets/images/safetynet-logo.png'
import arrowRight from '../../assets/images/arrow-right.png'
import logo from '../../assets/images/logo.png'
import sellersHeroMini from '../../assets/images/sellers-hero-mini.webp'
import sellersIcon from '../../assets/images/sellers-icon.webp'

const servicesList = [
  {
    title: 'Plan & Carry Out Promotional Campaigns',
    items: [
      'Regular Updates to Sellers',
      'Assisting with furnishing of Unavailable Documents',
      'Providing assistance in property surveys',
      'Arranging & Facilitating Site Inspections',
      'Services of a dedicated Transaction Coordinator',
      'Escrow and taking of all matters towards the sale',
      'Attending to necessary approvals with authorities',
    ],
    overlayTitle: 'Plan & Carry Out Promotional Campaigns',
    overlayTagline: 'Each property is a unique project.',
    overlayBody: 'Planning of the promotional campaigns are materialized giving detailed attention to market the speciality of the property. We ensure that the maximum attention from the genuine buyers is harnessed at a time by expanding our promotions across multiple platforms.',
  },
  {
    title: 'Help you to Make Selling Decisions',
    items: [
      'Obligation-free property appraisal',
      'Market comparison and pricing strategy',
      'Advice on property presentation and staging',
      'Guidance on legal and documentation requirements',
    ],
    overlayTitle: 'Help you to Make Selling Decisions',
    overlayTagline: 'Your time, money and efforts do count.',
    overlayBody: 'Even with the past property selling experiences, you need help to make the best decision at the moment of a sale. Our expertise knowledge in market conditions will be presented with timely information to help you identify the right value for your property and to make best and quick decisions during the sale.',
  },
  {
    title: 'Facilitation of Price Negotiations',
    items: [
      'Screening and qualifying prospective buyers',
      'Presenting and managing offers on your behalf',
      'Professional negotiation to achieve optimal price',
      'Transparent communication throughout the process',
    ],
    overlayTitle: 'Facilitation of Price Negotiations',
    overlayTagline: 'Negotiating is not bargaining!',
    overlayBody: 'During this sensitive and emotional stage of a sale for a property owner, we are there to mediate a smooth transaction helping sellers to make informed selling decisions and absorbing the turbulences in price negotiations between the seller and the buyer while maintaining the transparency. Successful negotiation is more than a matter of luck or natural talent. It also encompasses the learned ability to use certain skills and techniques to bring about those coveted win-win results.',
  },
]

const guideSteps = [
  {
    title: 'Facts at a Glance',
    content: [
      'At first, selling your home seems daunting: Most of you haven\'t sold a home before, the market looks complex, and what worked for owners 10 or 20 years ago seems inappropriate today.',
      'What steps should you take? Here\'s a simple list to get you started.',
      { bold: '1. Define your goal.', text: 'Do you want the highest sales price? The bottom line: to have a successful sale you need to look at both price and terms.' },
      { bold: '2. Times have changed.', text: 'Today\'s real estate marketplace is radically different when compared with that of 10 years ago. Purchasers now use the Internet, get architects, civil/structural engineers, professional valuers etc. in the process and are routinely represented by brokers. The result is that buyers are generally better prepared than in the past.' },
      { bold: '3. Sparkle and shine.', text: 'Imagine going to a supermarket and seeing dusty shelving filled with old and cans and uncleaned vegetables. You are turned off. You must make sure your potential buyer will not be similarly turned off. Get rid of things you don\'t want anymore, organize closets and storage areas, and keep things clean. Presentation matters.' },
      { bold: '4. Mechanics count.', text: 'Buyers expect everything to work. Air-conditioners, door locks, roller gates, sliding doors, lights and fittings, CCTV, burglar alarms, toilet cisterns and faucets are areas where attention is generally required. Fix and paint things now and they won\'t be an issue in the future.' },
      { bold: '5. Set the stage.', text: 'When buyers see your home, it\'s \'Showtime\'. They want an environment that they can relate to. De-clutter and hide knick knacks that will distract them from dreaming their future home. Give them a show where everything is painted, arranged, and attractive; a home where the only issue is when to move in.' },
      { bold: '6. Know the market. Real estate is local.', text: 'Your Real Estate Professional can explain current market trends in your community, including what\'s selling, what isn\'t selling, why and why not. This information is central to getting the optimal price and terms.' },
      { bold: '7. Know the competition.', text: 'Your property will be competing with other homes for buyer attention. Ask your Real Estate Professional how to be competitive — and how to have an edge.' },
      { bold: '8. Be realistic.', text: 'Markets differ by location and time. When interest rates are low it\'s great to be a seller. However when times are slack and mortgage rates are rising, homes also sell. The trick is to be realistic, to get as much as market conditions will allow. If there are 1000 home sellers catering to only 300 prospective home buyers, 700 houses will not get sold. Think carefully.' },
      { bold: '9. Have a plan.', text: 'Real estate marketing involves far more than an ad in the internet or paper. Successful Real Estate Professionals use a variety of methods to attract and qualify prospects, including both traditional and the latest communication methodologies.' },
      { bold: '10. Have your documents in order.', text: 'Many real estate transactions fall through at the final hour due to unavailability of important connecting documents on time. Obtain a title report if possible. Ensure you have a copy of each and every document referred to in the title report in your file. Apply for local authority documents and have them up-to-date. You have to impress your buyer\'s lawyer with the completeness of your file.' },
      { topic: 'Go it Alone, or Use a Professional?' },
      { bold: 'Can I go it alone? What it is like selling your property yourself? (For sale by owner)', text: 'The fact is most people who try to sell their own home end up using a broker in the end anyway. Before anybody decides to fly solo through this complex, time consuming and financially perilous process, they should consider the following questions:' },
      { bold: 'Will you really "save" the real estate commission?', text: 'You only pay the commission to the real estate broker if they successfully sell your house at the price acceptable to you. During the marketing time, the Real Estate Professional absorbs the marketing costs. When buyers see a home for sale \'by the owner\', they know the seller is exposed, fighting without a shield and it is easy to reach a bargain.' },
      { bold: 'Are you familiar with the procedures and documentation?', text: 'Nearly every phase of selling your home from advertising to closing is complicated. One wrong move and an entire deal can fall through.' },
      { bold: 'How many potential buyers will you reach?', text: 'Selling a home takes much more than publishing an advertisement in the internet or weekend paper. How will you promote your home? Will you write your own ads? How will you use the Internet? You have limited exposure to qualified buyers, who are working with Real Estate Professionals to find their dream home, which theoretically means your home will take longer to sell on the market.' },
      'The longer a home is on the market the lower the selling price is. Why? Because most buyers think that if the home has not sold after a while there must be something wrong with it.',
      { bold: 'Do you have the time?', text: 'Promoting a home is a full-time job, and you may already have one. Will you be able to take calls at any time? How about screening the callers to figure out if they\'re qualified to buy your home? Not everybody who calls is even suitable to walk through your home, but how can you tell? You have no way to screen the home buyers who call and want to see your home. You may be compromising the safety of your family. These are not things you can afford to be complacent about.' },
      { bold: 'Do you know the market well enough to get the most for your home?', text: 'Often the price is incorrectly set and the best deal is not obtained. It could be set too low and a great deal missed, or else too high, driving away potential buyers.' },
      { bold: 'What about your selling skills?', text: 'If the personalities of prospective buyers rub you the wrong way, can you still deal with them effectively? What about your own defensiveness when you hear negative comments about your home? It is best that you don\'t have to deal with such issues and the best way of keeping things at arm\'s length through a Real Estate Professional. Accepting an offer for your home is one thing, ensuring a safe and successful closing of a real estate transaction is quite another. Real estate transactions sometimes have problems to be resolved near the closing. This is the time that your experienced Real Estate Professional can be the most helpful. Remember that lawyers are not Real Estate Professionals and vice versa. Each has a specific job. Lawyers act only upon the client\'s instructions; they are not paid to negotiate a deal. This is the Real Estate Professional\'s job.' },
      { bold: 'Do you have the negotiation skills to keep a deal on track?', text: 'When an offer comes in, emotions can run high with so much money on the line. This is why direct seller-to-buyer deals often end in disaster. Good Real Estate Professionals keep it professional and are indispensable when it comes to bargaining with buyers. Most buyers find it extremely awkward to negotiate or even to talk directly with sellers and therefore walk away without making offers for "For Sale by Owner" properties. The Real Estate Professionals know how to overcome objections and negotiate a successful home sale transaction.' },
      { bold: '"Some people try to sell houses without brokers – not a strategy I would recommend. But if you are feeling up to it, by all means, be my guest. If you want to be your own broker, then the best piece of advice I have is: Act like a broker. To do so will require a lot of guts, a lot of brains, and lot of patience." — Donald J. Trump — "Think Like a Billionaire" (New York Times Bestseller)', text: '' },
    ],
  },
  {
    title: 'Finding a Good Real Estate Professional',
    content: [
      { bold: 'Using the Services of a Real Estate Professional when selling.', text: '' },
      'The task is to find a Real Estate Professional who you feel will best represent your interests in marketing and negotiating processes.',
      'If you do not know a Real Estate Professional that you would trust to sell your home/property, the first step is to ask around; inquire from people in your sphere of influence if they know of a real estate professional who can handle the job to your satisfaction.',
      'You may find it helpful to interview more than one. The purpose of the interview is to find out how the professional would market your property to find a qualified buyer and how they would communicate the processes from the time of taking over to the closing day.',
      'Choose the best person with the most experience and has the best negotiating skills. More experience could mean a higher price at the negotiating table, selling in less time, and with less hassle along the way.',
      'The worth of a Real Estate Professional, in the end, is how your property gets sold. The most popular real estate company, the person who offers the lowest commission or the person that suggests the highest listing price is not necessarily the best option.',
      'Before deciding on who you want to sell your property, here are some smart questions to ask:',
      { bold: '1. How long have you been in the business?', text: 'Those in the business longer bring more practical experience to the table.' },
      { bold: '2. What is your average list-to-sales-price ratio?', text: 'A competent real estate professional should hold a track record for negotiating sales prices that are very close to list prices.' },
      { bold: '3. How will your marketing plan meet my needs?', text: 'Specifically, how will you sell my home/property? Where and how often do you advertise? Do you market online and if so how?' },
      { bold: '4. Will you provide references?', text: 'Ask if any of the references are related to him/her. Ask if you can call their references with additional questions.' },
      { bold: '5. What separates you from your competition?', text: 'Key attributes to look for: assertiveness, availability by phone or e-mail, reliability analytical ability, professionalism and good negotiating skills.' },
      { bold: '6. How much do you charge?', text: 'It is important to know your obligations beforehand.' },
      { bold: '7. What haven\'t I asked you that I need to know?', text: 'Pay close attention to how the Real Estate Professional answers this question, because there is always something more you need to know.' },
      { bold: 'Tip: Read the testimonials received by Bimsara Real Estate and comments by customers', text: '' },
    ],
  },
  {
    title: 'Setting the Right Price',
    content: [
      'A key part of the marketing plan is setting the asking price. If a property is priced too low, you won\'t benefit from the optimal profit. If a property is priced too high, potential buyers may be scared away. The right asking price will attract buyers\' attention and pay you a maximum return.',
      'To determine the best asking price, you have to study, review and evaluate the property, the competition and marketplace trends. The location of the property, the layout, the quality of construction and the material used, width of the access road, its proximity to desirable schools and other public facilities, the size of the lot, the size and condition of the home itself and recent sales prices of comparable properties, are among the factors to consider in arriving at a fair asking price.',
      'You can reach the right asking price using this information. It is also helpful to discuss other terms and conditions, such as timing and items that can be included with the sale. These also can make your property more attractive to potential buyers.',
      { bold: '1. Location. You can\'t get away from this one.', text: 'If your property is located in a great neighbourhood in a desirable area that is in demand, you will be able to get a higher price than you can for the same property in a less desirable area.' },
      { bold: '2. Layout.', text: 'Meaning the design and the floor plan. A practical floor plan has appropriate space allocation and logical positioning of spaces. If your layout is acceptable to the majority of the potential buyers in the market, it can demand a premium price. Similarly, a poor layout will kill the demand for your home and generate negative results.' },
      { bold: '3. Access Road.', text: 'A home situated in a quiet and well maintained road with 20ft to 40ft width will position your price higher from the rest.' },
      { bold: '4. Condition.', text: 'A house that has been better maintained and shows better will always sell for more than one that has had neglected maintenance and needs work.' },
      { bold: '5. Desirable amenities.', text: 'If a house has amenities that are currently popular in the marketplace, it will bring a higher price.' },
      { bold: '6. Calculate the price per square foot.', text: 'The average price per square foot for homes in your neighborhood shouldn\'t be the sole determinant of the asking price for your home, but this information can be useful. Keep in mind that various methodologies can be used to calculate square footage and the price per square foot. The quality of construction and the material used, present condition and the usefulness of the layout will vary the price per square foot.' },
      { bold: '7. The general factors affecting your market.', text: 'How are interest rates affecting people\'s willingness to take out big mortgages? Do people feel confident about their financial futures? Your Real Estate Professional knows the answer to these questions and, more importantly, how they affect the price of your property.' },
      { bold: '8. Your property value within the market.', text: 'After accounting for general market influences, your Real Estate Professional will get very specific about your property. "Fair Market Price" or the "Asking Price" which is an algebraic expression of the value of your home compared to recent sales of similar real estate properties in your neighborhood. The complementing nature of the relationship between the value of the land and the value of the home structure matters when arriving at the asking price. No two properties are the same, but good Real Estate Professionals are knowledgeable at adjusting their calculations according to these measurable tangible differences. You can feel confident trusting their opinion. However, you will still have the final say over this magic number.' },
      'Remember always that buyers comparison-shop, especially for something as expensive as a home.',
    ],
  },
  {
    title: 'Listing Your Property for Sale',
    content: [
      'Once you decide that you are going to list your property with the Real Estate Professional, you may then ask the Real Estate Professional confirm his terms of sale in writing. It is in your own interest to confirm what is included in the sale to the Real Estate Professional; for example, the items in your home that convey to the new buyer as being part of the deal, as well as any other contingencies of the sale.',
      'A physical description of your property. The description should include all relevant information about your home to prospective buyers. The property must be well described paying attention to its features, aesthetics and advantages. Probably what you may not want to reveal at this point are the address and the viewing times.',
      'What exactly is included in the price?',
      'Movables and Fixtures — Movable items like washers, microwaves and curtains are not automatically included in the sale, but sellers will often include them to sweeten the deal. Any movable items you wish to include should be clearly noted.',
      'Fixtures are permanent improvements to a property like air conditioning, built-in ovens, hobs, microwaves, dishwashers and installed lighting. Fixtures are assumed to be included in the sale of the home unless you note otherwise. Maybe the dining room chandelier is a family heirloom and you wish to take it with you. The line between movable and fixture can get blurry, so leave nothing to chance! Go over every item and make sure it\'s accounted for in the Listing.',
      'Be honest about imperfections. Honesty is always the best policy. A major defect does not mean your home will not sell. List the defect and state how your home\'s price has been lowered accordingly. This can actually be attractive to some buyers, especially if they have experience with the required repairs!',
    ],
  },
  {
    title: 'Marketing Process',
    content: [
      { bold: '1. Prepare your home for sale.', text: 'Over the years, you\'ve grown quite comfortable with your home\'s little imperfections; the discoloured door handles, the chipped paint on walls and the mess in the storeroom. Grab a clipboard, print out a copy of our "Home Preparations Checklist" and take a tour of your home. During your "home tour" identify anything that\'s broken, half-finished or simply doesn\'t work. Fix all the little things like leaky faucets, doors that squeak or that won\'t close properly and small cracks in the ceiling. Some repairs are absolutely vital. Nothing kills a sale faster than signs of water damage. If there\'s an unsafe electrical problem you must fix this too, for the good of the sale and the buyer\'s safety (not to mention your own).' },
      { bold: '2. Depersonalize your home.', text: 'Remember, you want buyers to walk through your house and feel like it\'s their home, not yours! People just don\'t have good visual imagination. They won\'t see past your cluttered wall of family portraits, your collection of trophies or your \'eccentric\' home decor. These things are guaranteed to prevent buyers from emotionally placing themselves in your home. Remove everything that\'s too much about you. Although the buyer is a guest in your home, you want the buyer to imagine owning the home. You don\'t want to make the buyer feel like an intruder.' },
      { bold: '3. Never underestimate the power of paint.', text: 'Strong colours on the walls or wild wallpaper make it hard for buyers to imagine their furniture in your house. Consider repainting your home in bright, neutral colours that will enhance a room\'s size and make it look more inviting. Next to cleaning your home, paint is the most cost-effective way to increase your home\'s appeal, and attract offers.' },
      { bold: '4. Let your Real Estate Professional market your home.', text: 'You\'ve spruced up your home and it\'s never looked better. It\'s time for your Real Estate Professional to do their thing. Welcome to the appointment-only phase of showing your home. Your Real Estate Professional will act as a go-between and will give you as much notice for these visits as possible. If somebody is bold enough to knock on your door and ask for a "quick peak", politely tell them that all visits are being handled by your Real Estate Professional. A good Real Estate Professional uses many strategies to attract a good number of eager buyers.' },
      { bold: '5. The best way you can help.', text: 'Don\'t be there. You want people to feel relaxed, and allow themselves to daydream that your home is their home. This just isn\'t possible with you there. Go visit a friend, or if you have pets take them on a field trip.' },
    ],
  },
  {
    title: 'When Offers Come In',
    content: [
      { bold: 'Receiving offers.', text: 'All your hard work has paid off, but you won\'t know exactly how much it\'s paid off until you see the offers. This is an exciting, often emotional time, so be prepared.' },
      'However, all offers in place may not be genuine. In the absence of a regulatory framework governing real estate transactions in Sri Lanka, there is no mechanism to prevent unqualified buyers making offers. This problem has many folds. Unqualified buyers are those who haven\'t got their finances in place to make a purchase. Either they are foolishly optimistic that a lending institution would approve the amount they have in mind without an issue or want to first pay an advance and block a home and then sell theirs to raise the required money. Some have entered into flimsy sale agreements to sell theirs or just received an offer, in their opinion look very positive and genuine, for a property that has to sell first to go through the purchasing. Only a well versed Real Estate Professional will have the knowledge to ask the right questions to screen the good offers from the bad.',
      { bold: 'Your Real Estate Professional will walk you through the process. You\'ll see every offer.', text: 'Your Real Estate Professional will reveal you every offer that\'s received. They\'ll call for an appointment, usually at your home, to discuss offers. The buyers will not be there, so you can review and respond to the offers without any awkward pressure.' },
      'Here\'s where emotions can really kick in, but remain calm. Listen to the Real Estate Professional before making any judgments. You must extensively analyze the merits of the offers. Maybe it\'s time to plan your counter offer. You may also wish some private time to discuss things with your spouse.',
      { bold: 'About the offer:', text: 'When it comes to the type of offer you receive, it really depends on your buyer\'s individual situation.' },
      { bold: 'Firm Offer to Purchase:', text: 'Usually preferable to the seller, you, as it means the buyer is prepared to purchase the home without any conditions.' },
      { bold: 'Conditional Offer to Purchase:', text: 'Usually means there are one or more conditions on the purchase, such as "subject to resurvey", "subject to financing", etc. The home is not sold unless all the conditions have been met.' },
      { bold: 'Acceptance of Offer:', text: 'You may choose to accept the offer, reject it, or submit a counter-offer. The counter-offer may relate to the price, closing date, or any number of other variables. Offers can go back and forth until both parties have arrived at an agreement or either side ends the negotiations.' },
      { topic: 'Three options when responding to an Offer' },
      { bold: '1. You can accept the Offer.', text: 'You got the price you were hoping for or maybe even more! The closing date looks good and there are no fussy conditions.' },
      { bold: '2. You can reject the Offer.', text: 'This offer isn\'t even close.' },
      { bold: '3. You can "counter" the Offer.', text: 'This offer is close, but something\'s not quite right. Now the delicate art of negotiation begins.' },
      { topic: 'Reasons Why You May Want to "Counter"' },
      { bold: '1. You want more money.', text: 'This is by far the most common reason people "Counter". Everybody wants to get the most for their home, and as the saying goes "if you don\'t ask, you don\'t get". Go for it, but don\'t get too greedy and insult someone who has made a fair offer.' },
      { bold: '2. You want to change the closing date.', text: 'Maybe your buyer has already sold their previous home and has no place to live. They want to move in soon; sooner than you\'d like. Maybe you haven\'t even started looking for a new home! You can also compromise closing date. Welcome to the world of negotiation and compromise.' },
      { bold: '3. There may be some undesirable conditions on the offer.', text: 'Conditions are points of contention that must be fulfilled in order for the sale to go through. Property inspections, resurveys and settlement plans are some common conditions that buyers place on their offers.' },
      { topic: 'The Art of Counter-Offers and Negotiation' },
      'Be prepared to compromise. "Win-win" doesn\'t mean both the buyer and the seller will get everything they want. It means both sides will win some and give some. Rather than approaching negotiations from an adversarial winner-take-all perspective, focus on your top priorities and don\'t let your emotions overrule your better judgment.',
      'A successful negotiation is one that leaves both you and the buyer feeling satisfied with the outcome. This is a highly emotional time, so be sure to regularly "check your head", and ask yourself "How important is this particular detail to me? Am I willing to jeopardize a sale over this?" Remember once you "counter" an offer, you are releasing the buyer from their offer and they are free to walk away. Thankfully, your Real Estate Professional is an expert and seasoned negotiator, and will help you every step of the way.',
      'Successful negotiating is more than a matter of luck or natural talent. It also encompasses the learned ability to use certain skills and techniques to bring about those coveted win-win results.',
      'Happy negotiating and best of luck!',
    ],
  },
  {
    title: 'Managing the Transaction',
    content: [
      'During this time or prior to the offer being conveyed, you may have to accommodate various representatives of the buyer. They may include the buyer\'s friends and family, professionals such as architects and technically qualified persons and those providing religious and astrological guidance. Once you have negotiated an acceptable offer on your home, you will then release copies of title deeds and other documents usually require for title clearance. You will then begin the wait for closing day. During this time, the lending institution will be completing their work. The home will be inspected by a real estate appraiser to certify the value. Sometimes a resurvey of the property may be required. Your Real Estate Professional is truly the play-maker during this time. They will be coordinating all of the inspections and assisting with many different things.',
    ],
  },
  {
    title: 'Closing the Deal',
    content: [
      'Your negotiations were successful. Now you are ready to enter into a legally binding agreement. Is the house truly sold, though? No, not quite yet. It\'s time for the vital final steps known as "closing". Once the title is cleared and all of the mortgage processing (if applicable) has been completed and the buyer\'s financing has been approved, the closing date will be set.',
      { topic: 'Your Real Estate Professional and lawyer will do most of the work.' },
      'Thank goodness! Closing a deal involves many, many complicated and time-consuming legal maneuvers. That\'s why you\'ve hired professionals.',
      { bold: 'How your lawyer will help with the sale?', text: 'Your lawyer will draw the Sale Agreement (if needed), review all important documents including the Deed of Transfer that require your signature. You can be legally binding to anything you sign, so it\'s essential to make sure you\'re protected.' },
      { topic: 'Your Closing Checklist' },
      'You have plenty to do yourself. Here\'s a comprehensive list.',
      '1. Contact your lawyers and notify them to release the documents pertaining to your property to the buyer\'s lawyers.',
      '2. Immediately begin satisfying any conditions of the agreement that require action on your part. They have definitive dates for completion and failure to do so can result in a lot of hassles and even spoil the whole deal.',
      '3. If you plan to "discharge" or pay off your mortgage with proceeds of the sale, you will need to obtain a statement from your lender showing your outstanding balance on the mortgage and any penalties you\'ll have to pay to discharge the mortgage.',
      '4. Contact the utilities, telephone and cable companies about transfer or discontinuation of service.',
      '5. Contact a moving company to arrange your move on or prior to the closing date.',
      '6. Send out your change of address notices and advise the post office.',
      '7. Notify your Real Estate Professional immediately if anything changes about your property or your situation.',
      { bold: 'Congratulations!', text: 'You should be pleased that all your hard work paid off. We hope these steps helped make it easier. You\'ve probably already planned to use the proceeds from your sale to purchase your next property. A very wise move indeed, because as you know, home ownership is one of the best long-term investments you\'ll ever make.' },
    ],
  },
]

export default function Sellers() {
  const { data } = useSiteData()
  const isMobile = useIsMobile()
  const [expandedService, setExpandedService] = useState(0)
  const [activeStep, setActiveStep] = useState(null)
  const [selectedService, setSelectedService] = useState(null)

  if (isMobile) {
    return (
      <MobileServiceLayout
        heroTitle="Selling your property"
        servicesList={servicesList}
        guideTitle="Selling your property"
        guideName="Seller's Guide"
        guideSteps={guideSteps}
        defaultContentTitle="Property Sellers"
        breadcrumbLabel="For Sellers"
        renderAfterServices={() => (
          <div className="mt-6 px-1 w-[80%] mx-auto">
            <ul className="space-y-3">
              {servicesList[0].items.map((item) => (
                <li key={item} className="font-lato text-[16px] font-semibold text-white/75 leading-[1.7] text-center">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        defaultContentBody={[
          { italic: 'Dear Home Seller' },
          'We are glad to meet you at your home and answer whatever questions you may have concerning your sale. One of the biggest concerns you may have would be "What price?" We can conduct an obligation free appraisal of your home to determine the right asking price and the probable selling price.',
          'Selling your house through us can entail a variety of marketing strategies. Much of our work will be quiet and unseen – yet significant. We will help distinguish your house in your local marketplace and attract buyers to your house. In addition, we will promote your house one to one basis to a large number of potential buyers who depend on us to find the right place for them. At a given moment, a considerable number of such buyers are working with us to find their dream home. We possess correct mechanisms to identify the genuine buyers of different budget categories in the market place.',
          'This process involves working with contacts, matching your house specifications with the buyer\'s requirements (screening & qualifying), making appointments & showing your house to prospective buyers, the follow-ups, price negotiations and other outreach efforts - all are part of the process required to sell.',
          'Not limiting our job to just in putting the two parties together, our services cover some important elements that would take care of your modern day\'s interests including attending to your documentation requirements when that matters. Our experts will professionally guide you through the entire process.',
          'Our commitment is to sell at the best price possible in the shortest amount of time.',
          { bold: 'Our Fees', text: `${data.commissionRate} commission on the actual transaction value. No advance payments or other hidden costs.` },
        ]}
      />
    )
  }

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen text-white overflow-hidden" style={{backgroundColor: '#0A0F20'}}>

        {/* Logo top left */}
        <div className="absolute top-0 left-0 z-20 px-[5%] lg:px-[8%] pt-6 lg:pt-8">
          <img src={logo} alt="Bimsara Real Estate" className="h-[27px] lg:h-[39px] [transform:scaleX(1.05)] origin-left lg:pl-[30px]" />
        </div>

        <div className="relative z-10 w-full px-[3.15%] lg:px-[5.08%] pt-[80px] lg:pt-[100px] pb-[60px]">
          {/* Breadcrumb */}
          <p className="font-lato text-[13px] text-nobel mb-8">
            <Link to="/services" className="hover:text-white transition-colors">Our Services</Link>
            <span className="mx-2 text-nobel/50">/</span>
            <span className="text-white">For Sellers</span>
          </p>

          <div className="flex flex-col lg:flex-row lg:items-start w-full">
          {/* Left column */}
          <div className="lg:w-[50%]">
            <h1 className="font-lato text-[32px] lg:text-[48px] font-normal text-white mb-8 leading-tight">
              Selling your property
            </h1>
            <p className="font-lato text-[18px] lg:text-[23px] tracking-[0.84em] text-royal-blue uppercase mb-10 lg:pl-[20px]">
              OUR SERVICES
            </p>

            {/* Service cards */}
            <style>{`
              @keyframes rainbow-flow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .service-card {
                width: 85.5%;
                max-width: 750px;
                background: linear-gradient(to right, #2e2e3e, #1a1a2e, #2e2e3e);
                border-radius: 40px;
                transition: all 0.4s ease;
                position: relative;
                overflow: hidden;
              }
              .service-card::before {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: 40px;
                background: linear-gradient(120deg, #f4a4c0, #c9a4f4, #a4c4f4, #a4f4e0, #f4a4c0);
                background-size: 300% 300%;
                opacity: 0;
                transition: opacity 0.4s ease;
                animation: rainbow-flow 4s ease infinite;
              }
              .service-card:hover::before {
                opacity: 1;
              }
              .service-card-inner {
                position: relative;
                z-index: 1;
              }
            `}</style>
            <div className="space-y-8 lg:w-[120%]">
              {servicesList.map((s) => (
                <div key={s.title} className="service-card" onClick={() => setSelectedService(s)}>
                  <div className="service-card-inner w-full pl-[42px] pr-8 lg:pl-[55px] lg:pr-[42px] pt-[26px] lg:pt-9 pb-10 lg:pb-[52px]">
                    <p className="font-lato text-[26px] lg:text-[32px] font-normal text-white mb-4">
                      {s.title}
                    </p>
                    <div className="w-[58px] h-[58px] rounded-full border-2 border-white/70 flex items-center justify-center">
                      <svg width="25" height="25" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="hidden lg:flex lg:flex-1 flex-col gap-12 pt-[160px] items-center">
            {/* Hero mini image */}
            <img
              src={sellersHeroMini}
              alt="Sellers"
              className="w-[59.3%] rounded-[32px] object-cover overflow-hidden"
              style={{height: '182px', objectPosition: 'center', objectFit: 'cover'}}
            />
            {/* Items list from first service */}
            <ul className="space-y-4">
              {servicesList[0].items.map((item) => (
                <li key={item} className="font-lato text-[17px] lg:text-[18px] text-white/80 leading-[1.8]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          </div>
        </div>

        {/* Service card overlay - slides in from right */}
        <div
          className={`fixed top-0 right-0 h-full w-1/2 z-50 transition-transform duration-500 ease-out ${selectedService ? 'translate-x-0' : 'translate-x-full'}`}
          style={{background: 'linear-gradient(160deg, #f4a4c0 0%, #c9a4f4 35%, #a4c4f4 70%, #d0e8ff 100%)'}}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedService(null)}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 transition-colors flex items-center justify-center text-white text-lg font-light"
          >
            ×
          </button>

          {/* Content */}
          <div className="h-full overflow-y-auto px-10 pt-32 pb-16 max-w-[75%]">
            {selectedService && (
              <>
                <p className="font-lato text-[24px] text-royal-blue font-semibold mb-5 tracking-wide leading-snug">
                  {selectedService.overlayTitle}
                </p>
                <p className="font-lato text-[21px] text-ebony-clay mb-4 leading-[1.7]">
                  {selectedService.overlayTagline}
                </p>
                <p className="font-lato text-[21px] text-ebony-clay/80 leading-[1.7]">
                  {selectedService.overlayBody}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Overlay backdrop */}
        {selectedService && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setSelectedService(null)}
          />
        )}

      </section>

      {/* ═══ SELLER'S GUIDE ═══ */}
      <section className="py-[5%] px-[2.55%] lg:px-[4.08%] bg-white bg-lines">

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Guide sidebar */}
          <div className="lg:w-[429px] shrink-0 flex flex-col gap-5">
            {/* Top row - title */}
            <h2 className="font-lato text-[30px] lg:text-[36px] font-normal text-crimson">Selling your property</h2>

            {/* Bottom row - gray content area */}
            <div className="bg-gray-100 rounded-[16px] p-5">

            {/* Property Sellers clickable item */}
            <button
              onClick={() => setActiveStep(null)}
              className={`w-full text-left flex items-center gap-3 mb-4 rounded-[8px] border transition-colors ${
                activeStep === null
                  ? 'border border-gray-300 bg-white'
                  : 'border border-gray-200 hover:bg-concrete'
              }`}
            >
              <img src={sellersIcon} alt="" className="w-8 h-8 shrink-0" onError={(e) => { e.target.style.display='none' }} />
              <span className={`font-lato text-[19px] lg:text-[20px] leading-[3.9] ${activeStep === null ? 'text-gray-400' : 'text-ebony-clay'}`}>
                Property Sellers
              </span>
            </button>

            <h3 className="font-lato text-[22px] font-bold text-ebony-clay mb-3">Seller's Guide</h3>
            <div className="space-y-0">
              {guideSteps.map((step, i) => (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                  className={`w-full text-left flex items-center gap-3 py-3 border-b transition-colors ${
                    activeStep === i
                      ? 'border border-gray-300 rounded-[8px] px-3 bg-white'
                      : 'border-transparent border-b-gray-200 px-0'
                  }`}
                >
                  {/* Thumbnail placeholder with rainbow gradient */}
                  <div className="w-10 h-10 rounded-[6px] shrink-0 overflow-hidden" style={{
                    background: 'linear-gradient(135deg, #f4a4c0 0%, #c9a4f4 33%, #a4c4f4 66%, #a4f4e0 100%)',
                    opacity: 0.7
                  }} />
                  <span className={`font-lato text-[19px] lg:text-[20px] leading-tight ${
                    activeStep === i ? 'text-gray-400' : 'text-ebony-clay'
                  }`}>
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
            </div> {/* end gray area */}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto max-h-[80vh] pr-2" style={{scrollbarWidth: 'thin'}}>
            {activeStep === null ? (
              /* Property Sellers default content */
              <>
                <h3 className="font-lato text-[26px] lg:text-[34px] font-normal text-ebony-clay mb-4">Property Sellers</h3>

                <div className="space-y-4">
                  {[
                    { italic: 'Dear Home Seller' },
                    'We are glad to meet you at your home and answer whatever questions you may have concerning your sale. One of the biggest concerns you may have would be "What price?" We can conduct an obligation free appraisal of your home to determine the right asking price and the probable selling price.',
                    'Selling your house through us can entail a variety of marketing strategies. Much of our work will be quiet and unseen – yet significant. We will help distinguish your house in your local marketplace and attract buyers to your house. In addition, we will promote your house one to one basis to a large number of potential buyers who depend on us to find the right place for them. At a given moment, a considerable number of such buyers are working with us to find their dream home. We possess correct mechanisms to identify the genuine buyers of different budget categories in the market place.',
                    'This process involves working with contacts, matching your house specifications with the buyer\'s requirements (screening & qualifying), making appointments & showing your house to prospective buyers, the follow-ups, price negotiations and other outreach efforts - all are part of the process required to sell.',
                    'Not limiting our job to just in putting the two parties together, our services cover some important elements that would take care of your modern day\'s interests including attending to your documentation requirements when that matters. Our experts will professionally guide you through the entire process.',
                    'Our commitment is to sell at the best price possible in the shortest amount of time.',
                    { bold: 'Our Fees', rate: true },
                  ].map((item, i) => {
                    if (typeof item === 'object' && item.italic) {
                      return <p key={i} className="font-lato text-[14px] font-light text-scorpion italic">{item.italic}</p>
                    }
                    if (typeof item === 'object' && item.bold) {
                      return (
                        <p key={i} className="font-lato text-[18px] lg:text-[20px] font-light text-ebony-clay leading-[29px] text-justify">
                          <span className="font-bold">{item.bold}</span>{' '}{item.rate ? `${data.commissionRate} commission on the actual transaction value. No advance payments or other hidden costs.` : item.text}
                        </p>
                      )
                    }
                    return <p key={i} className="font-lato text-[18px] lg:text-[20px] font-light text-ebony-clay leading-[29px] text-justify">{item}</p>
                  })}
                </div>
              </>
            ) : (
              /* Guide step content */
              <>
                <h3 className="font-lato text-[26px] lg:text-[34px] font-normal text-ebony-clay mb-1">
                  {guideSteps[activeStep].title}
                </h3>
                <div className="space-y-4 mt-4">
                  {guideSteps[activeStep].content?.map((item, i) => {
                    if (typeof item === 'object' && item.topic) {
                      return <h4 key={i} className="font-lato text-[17px] lg:text-[19px] font-bold text-ebony-clay mt-6 mb-1">{item.topic}</h4>
                    }
                    return (
                      <p key={i} className="font-lato text-[18px] lg:text-[20px] font-light text-ebony-clay leading-[29px] text-justify">
                        {typeof item === 'object' && item.bold
                          ? <><span className="font-bold">{item.bold}</span>{' '}{item.text}</>
                          : item}
                      </p>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-start">
          <Link to="/#contact" className="pill-btn">
            Contact Us
            <img src={arrowRight} alt="" className="w-5 h-5" />
          </Link>
          <Link to="/services" className="font-lato text-[14px] text-scorpion hover:text-ebony-clay transition-colors self-center">
            ← Back to All Services
          </Link>
        </div>
      </section>
    </div>
  )
}
