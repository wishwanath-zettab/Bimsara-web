import React from "react";

const SellerContent = (props) => {
  const propertySellers = () => {
    return (
      <div className="content">
        {!props.mobile ? <div className="topic">Property Sellers</div> : ""}

        <div className="content-text">
          Dear Home Seller
          <br />
          <div className="margin-top" />
          We are glad to meet you at your home and answer whatever questions you
          may have concerning your sale. One of the biggest concerns you may
          have would be “What price?” We can conduct an obligation free
          appraisal of your home to determine the right asking price and the
          probable selling price.
          <br />
          <div className="margin-top" />
          Selling your house through us can entail a variety of marketing
          strategies. Much of our work will be quiet and unseen – yet
          significant. We will help distinguish your house in your local
          marketplace and attract buyers to your house. In addition, we will
          promote your house one to one basis to a large number of potential
          buyers who depend on us to find the right place for them. At a given
          moment, a considerable number of such buyers are working with us to
          find their dream home. We possess correct mechanisms to identify the
          genuine buyers of different budget categories in the market place.
          <br />
          <div className="margin-top" />
          This process involves working with contacts, matching your house
          specifications with the buyer’s requirements (screening & qualifying),
          making appointments & showing your house to prospective buyers, the
          follow-ups, price negotiations and other outreach efforts - all are
          part of the process required to sell.
          <br />
          <div className="margin-top" />
          Not limiting our job to just in putting the two parties together, our
          services cover some important elements that would take care of your
          modern day’s interests including attending to your documentation
          requirements when that matters. Our experts will professionally guide
          you through the entire process.
          <br />
          Our commitment is to sell at the best price possible in the shortest
          amount of time.
          <br />
          <div className="margin-top" />
          <span className="bold-content">Our Fees</span>
          <br />
          Our fee is {props.commissionRate} commission on the actual transaction value. No advance
          payments or other hidden costs.
        </div>
      </div>
    );
  };
  const guideOne = () => {
    return (
      <div className="content">
        {!props.mobile ? <div className="topic">Facts at a Glance</div> : ""}

        <div className="content-text">
          At first, selling your home seems daunting: Most of you haven’t sold a
          home before, the market looks complex, and what worked for owners 10
          or 20 years ago seems inappropriate today.
          <br />
          <div className="margin-top" />
          What steps should you take? Here’s a simple list to get you started.
          <br />
          <div className="margin-top" />
          <span className="bold-content ">1. Define your goal.</span> Do you
          want the highest sales price? The bottom line: to have a successful
          sale you need to look at both price and terms.
          <br />
          <div className="margin-top" />
          <span className="bold-content ">2. Times have changed.</span>{" "}
          Purchasers now use AI and also get professionals such as architects,
          civil structural engineers, valuers etc in their decision-making
          process and are routinely represented by brokers.
          <br />
          <div className="margin-top" />
          <span className="bold-content ">3. Sparkle and shine.</span> Imagine
          going to a supermarket and seeing dusty shelving filled with old and
          cans and uncleaned vegetables. You are turned off. You must make sure
          your potential buyer will not be similarly turned off. Get rid of
          things you don’t want anymore, organize closets and storage areas, and
          keep things clean. Presentation matters.
          <br />
          <div className="margin-top" />
          <span className="bold-content ">4. Mechanics count.</span> Buyers
          expect everything to work. Air-conditioners, door locks, roller gates,
          sliding doors, lights and fittings, CCTV, burglar alarms, toilet
          cisterns and faucets are areas where attention is generally required.
          Fix and paint things now and they won’t be an issue in the future.
          <br />
          <div className="margin-top" />
          <span className="bold-content ">5. Set the stage.</span> When buyers
          see your home, it’s ‘Showtime’. They want an environment that they can
          relate to. De-clutter and hide knick knacks that will distract them
          from dreaming their future home. Give them a show where everything is
          painted, arranged, and attractive; a home where the only issue is when
          to move in.
          <br />
          <div className="margin-top" />
          <span className="bold-content ">
            6. Know the market. Real estate is local.
          </span>{" "}
          Your Real Estate Professional can explain current market trends in
          your community, including what’s selling, what isn’t selling, why and
          why not. This information is central to getting the optimal price and
          terms.
          <br />
          <div className="margin-top" />
          <span className="bold-content ">7. Know the competition.</span> Your
          property will be competing with other homes for buyer attention. Ask
          your Real Estate Professional how to be competitive — and how to have
          an edge.
          <br />
          <div className="margin-top" />
          <span className="bold-content ">8. Be realistic.</span> Markets differ
          by location and time. When interest rates are low it’s great to be a
          seller. However when times are slack and mortgage rates are rising,
          homes also sell. The trick is to be realistic, to get as much as
          market conditions will allow. If there are 1000 home sellers catering
          to only 300 prospective home buyers, 700 houses will not get sold.
          Think carefully.
          <br />
          <div className="margin-top" />
          <span className="bold-content ">9. Have a plan.</span> Real estate
          marketing involves far more than an ad in the Property website, paper
          or social media.
          Successful Real Estate Professionals use a variety of methods to
          attract and qualify prospects, including both traditional and the
          latest communication methodologies.
          <br />
          <div className="margin-top" />
          <span className="bold-content ">
            10. Have your documents in order.
          </span>{" "}
          Many real estate transactions fall through at the final hour due to
          unavailability of important connecting documents on time. Obtain a
          title report if possible. Ensure you have a copy of each and every
          document referred to in the title report in your file. Apply for local
          authority documents and have them up-to-date. You have to impress your
          buyer’s lawyer with the completeness of your file.
        </div>
        <div className="margin-top-60" />
        <div className="topic">Go it Alone, or Use a Professional?</div>
        <div className="content-text">
          <div className="margin-top" />
          <div className="bold-content">
            Can I go it alone? What it is like selling your property yourself?
            (For sale by owner)
          </div>
          The fact is most people who try to sell their own home end up using a
          broker in the end anyway. Before anybody decides to fly solo through
          this complex, time consuming and financially perilous process, they
          should consider the following questions:
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            Will you really “save” the real estate commission?
          </div>
          You only pay the commission to the real estate broker if they
          successfully sell your house at the price acceptable to you. During
          the marketing time, the Real Estate Professional absorbs the marketing
          costs. When buyers see a home for sale ‘by the owner’, they know the
          seller is exposed, fighting without a shield and it is easy to reach a
          bargain.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            Are you familiar with the procedures and documentation?
          </div>
          Nearly every phase of selling your home from advertising to closing is
          complicated. One wrong move and an entire deal can fall through.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
                More than publishing advertisements.
          </div>
          Selling a home takes much more than publishing an advertisement in the
          internet or weekend paper. How will you promote your home? Will you
          write your own ads? How will you use property websites/social media
          platforms? Private sellers typically have limited exposure to
          qualified buyers. In contrast, real estate professionals receive a
          continuous stream of inquiries from active market participants. This
          broader reach significantly improves the probability of connecting
          with the right buyer within a shorter timeframe.
          <br />
          <div className="margin-top" />
          The longer a home is on the market the lower the selling price is.
          Why? Because most buyers think that if the home has not sold after a
          while there must be something wrong with it.
          <br />
          <div className="margin-top" />
          <div className="bold-content">Do you have the time?</div>
          Promoting a home is a full-time job, and you may already have one.
          Will you be able to take calls at any time? How about screening the
          callers to figure out if they’re qualified to buy your home? Not
          everybody who calls is even suitable to walk through your home, but
          how can you tell?
          <br />
          You have no way to screen the home buyers who call and want to see
          your home. You may be compromising the safety of your family. These
          are not things you can afford to be complacent about.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            Do you know the market well enough to get the most for your home?
          </div>
          Often the price is incorrectly set and the best deal is not obtained.
          It could be set too low and a great deal missed, or else too high,
          driving away potential buyers.
          <br />
          <div className="margin-top" />
          <div className="bold-content">What about your selling skills?</div>
          If the personalities of prospective buyers rub you the wrong way, can
          you still deal with them effectively? What about your own
          defensiveness when you hear negative comments about your home? It is
          best that you don’t have to deal with such issues and the best way of
          keeping things at arm’s length through a Real Estate Professional.
          Accepting an offer for your home is one thing, ensuring a safe and
          successful closing of a real estate transaction is quite another. Real
          estate transactions sometimes have problems to be resolved near the
          closing. This is the time that your experienced Real Estate
          Professional can be the most helpful. Remember that lawyers are not
          Real Estate Professionals and vice versa. Each has a specific job.
          Lawyers act only upon the client’s instructions; they are not paid to
          negotiate a deal. This is the Real Estate Professional’s job.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            Do you have the negotiation skills to keep a deal on track?
          </div>
          When an offer comes in, emotions can run high with so much money on
          the line. This is why direct seller-to-buyer deals often end in
          disaster. Good Real Estate Professionals keep it professional and are
          indispensable when it comes to bargaining with buyers. Most buyers
          find it extremely awkward to negotiate or even to talk directly with
          sellers and therefore walk away without making offers for “For Sale by
          Owner” properties. The Real Estate Professionals know how to overcome
          objections and negotiate a successful home sale transaction.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            Choosing to sell a property without a broker means assuming the
            full role of one — a task that requires market insight, strategic
            thinking, resilience, and patience. Without these capabilities, many
            properties simply remain part of the majority that stay on the
            market rather than the minority that successfully transact.
          </div>
        </div>
      </div>
    );
  };
  const guideTwo = () => {
    return (
      <div className="content">
        {!props.mobile ? (
          <div className="topic">Finding a Good Real Estate Professional</div>
        ) : (
          ""
        )}

        <div className="content-text">
          <div className="bold-content">
            Using the Services of a Real Estate Professional when selling.
          </div>
          <br />
          The task is to find a Real Estate Professional who you feel will best
          represent your interests in marketing and negotiating processes.
          <br />
          <div className="margin-top" />
          If you do not know a Real Estate Professional that you would trust to
          sell your home/property, the first step is to ask around; inquire from
          people in your sphere of influence if they know of a real estate
          professional who can handle the job to your satisfaction.
          <br />
          <div className="margin-top" />
          You may find it helpful to interview more than one. The purpose of the
          interview is to find out how the professional would market your
          property to find a qualified buyer and how they would communicate the
          processes from the time of taking over to the closing day.
          <br />
          <div className="margin-top" />
          Choose the best person with the most experience and has the best
          negotiating skills. More experience could mean a higher price at the
          negotiating table, selling in less time, and with less hassle along
          the way.
          <br />
          <div className="margin-top" />
          The worth of a Real Estate Professional, in the end, is how your
          property gets sold. The most popular real estate company, the person
          who offers the lowest commission or the person that suggests the
          highest listing price is not necessarily the best option.
          <br />
          <div className="margin-top" />
          Before deciding on who you want to sell your property, here are some
          smart questions to ask:
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            1. How long have you been in the business?
          </div>{" "}
          Those in the business longer bring more practical experience to the
          table.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            2. What is your average list-to-sales-price ratio?
          </div>{" "}
          A competent real estate professional should hold a track record for
          negotiating sales prices that are very close to list prices.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            3. How will your marketing plan meet my needs?
          </div>{" "}
          Specifically, how will you sell my home/property? Where and how often
          do you advertise? Do you market online and if so how?
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            4. Will you provide references?
          </div>{" "}
          Ask if any of the references are related to him/her. Ask if you can
          call their references with additional questions.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            5. What separates you from your competition?
          </div>{" "}
          Key attributes to look for: assertiveness, availability by phone or
          e-mail, reliability analytical ability, professionalism and good
          negotiating skills.
          <br />
          <div className="margin-top" />
          <div className="bold-content">6. How much do you charge?</div> It is
          important to know your obligations beforehand.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            7. What haven’t I asked you that I need to know?
          </div>{" "}
          Pay close attention to how the Real Estate Professional answers this
          question, because there is always something more you need to know.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            Tip: Read the testimonials received by Bimsara Real Estate and
            comments by customers
          </div>
        </div>
      </div>
    );
  };
  const guideThree = () => {
    return (
      <div className="content">
        {!props.mobile ? (
          <div className="topic">Setting the Right Price</div>
        ) : (
          ""
        )}
        <div className="content-text">
          A key part of the marketing plan is setting the asking price. If a
          property is priced too low, you won’t benefit from the optimal profit.
          If a property is priced too high, potential buyers may be scared away.
          The right asking price will attract buyers’ attention and pay you a
          maximum return.
          <br />
          <div className="margin-top" />
          To determine the best asking price, you have to study, review and
          evaluate the property, the competition and marketplace trends. The
          location of the property, the layout, the quality of construction and
          the material used, width of the access road, its proximity to
          desirable schools and other public facilities, the size of the lot,
          the size and condition of the home itself and recent sales prices of
          comparable properties, are among the factors to consider in arriving
          at a fair asking price.
          <br />
          <div className="margin-top" />
          You can reach the right asking price using this information. It is
          also helpful to discuss other terms and conditions, such as timing and
          items that can be included with the sale. These also can make your
          property more attractive to potential buyers.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            1. Location. You can’t get away from this one.{" "}
          </div>{" "}
          If your property is located in a great neighbourhood in a desirable
          area that is in demand, you will be able to get a higher price than
          you can for the same property in a less desirable area.
          <br />
          <div className="margin-top" />
          <div className="bold-content">2. Layout.</div> Meaning the design and
          the floor plan. A practical floor plan has appropriate space
          allocation and logical positioning of spaces. If your layout is
          acceptable to the majority of the potential buyers in the market, it
          can demand a premium price. Similarly, a poor layout will kill the
          demand for your home and generate negative results.
          <br />
          <div className="margin-top" />
          <div className="bold-content">3. Access Road.</div> A home situated in
          a quiet and well maintained road with 20ft to 40ft width will position
          your price higher from the rest.
          <br />
          <div className="margin-top" />
          <div className="bold-content">4. Condition.</div> A house that has
          been better maintained and shows better will always sell for more than
          one that has had neglected maintenance and needs work.
          <br />
          <div className="margin-top" />
          <div className="bold-content">5. Desirable amenities.</div> If a house
          has amenities that are currently popular in the marketplace, it will
          bring a higher price.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            6. Calculate the price per square foot.
          </div>{" "}
          The average price per square foot for homes in your neighborhood
          shouldn’t be the sole determinant of the asking price for your home,
          but this infomation can be a useful. Keep in mind that various
          methodologies can be used to calculate square footage and the price
          per square foot. The quality of construction and the material used,
          present condition and the usefulness of the layout will vary the price
          per square foot.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            7. The general factors affecting your market.
          </div>{" "}
          How are interest rates affecting people’s willingness to take out big
          mortgages? Do people feel confident about their financial futures?
          Your Real Estate Professional knows the answer to these questions and,
          more importantly, how they affect the price of your property.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            8. Your property value within the market.
          </div>{" "}
          After accounting for general market influences, your Real Estate
          Professional will get very specific about your property. “Fair Market
          Price” or the Asking Price” which is an algebraic expression of the
          value of your home compared to recent sales of similar real estate
          properties in your neighborhood. The complementing nature of the
          relationship between the value of the land and the value of the home
          structure matters when arriving at the asking price. No two properties
          are the same, but good Real Estate Professionals are knowledgeable at
          adjusting their calculations according to these measurable tangible
          differences. You can feel confident trusting their opinion. However,
          that you will still have the final say over this magic number.
          <br />
          <div className="margin-top" />
          Remember always that buyers comparison-shop, especially for something
          as expensive as a home.
        </div>
      </div>
    );
  };
  const guideFour = () => {
    return (
      <div className="content">
        {!props.mobile ? (
          <div className="topic">Listing Your Property for Sale</div>
        ) : (
          ""
        )}
        <div className="content-text">
          Once you decide that you are going to list your property with the Real
          Estate Professional, you may then ask the Real Estate Professional
          confirm his terms of sale in writing. It is in your own interest to
          confirm what is included in the sale to the Real Estate Professional;
          for example, the items in your home that convey to the new buyer as
          being part of the deal, as well as any other contingencies of the
          sale.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            A physical description of your property.
          </div>
          The description should include all relevant information about your
          home to prospective buyers. The property must be well described paying
          attention to its features, aesthetics and advantages. Probably what
          you may not want to reveal at this point are the address and the
          viewing times.
          <br />
          <div className="margin-top" />
          <div className="topic">What exactly is included in the price?</div>
          <div className="bold-content">Movables and Fixtures</div>
          Movable items like washers, microwaves and curtains are not
          automatically included in the sale, but sellers will often include
          them to sweeten the deal. Any movable items you wish to include should
          be clearly noted.
          <br />
          <div className="margin-top" />
          Fixtures are permanent improvements to a property like air
          conditioning, built-in ovens, hobs, microwaves, dishwashers and
          installed lighting. Fixtures are assumed to be included in the sale of
          the home unless you note otherwise. Maybe the dining room chandelier
          is a family heirloom and you wish to take it with you. The line
          between movable and fixture can get blurry, so leave nothing to
          chance! Go over every item and make sure it’s accounted for in the
          Listing.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            Be honest about imperfections. Honesty is always the best policy
          </div>
          A major defect does not mean your home will not sell. List the defect
          and state how your home’s price has been lowered accordingly. This can
          actually be attractive to some buyers, especially if they have
          experience with the required repairs!
        </div>
      </div>
    );
  };
  const guideFive = () => {
    return (
      <div className="content">
        {!props.mobile ? <div className="topic">Marketing Process</div> : ""}
        <div className="content-text">
          <div className="bold-content"> 1.Prepare your home for sale.</div>
          Over the years, you’ve grown quite comfortable with your home’s little
          imperfections; the discoloured door handles, the chipped paint on
          walls and the mess in the storeroom. Grab a clipboard, print out a
          copy of our “Home Preparations Checklist” and take a tour of your
          home. During your “home tour” identify anything that’s broken,
          half-finished or simply doesn’t work. Fix all the little things like
          leaky faucets, doors that squeak or that won’t close properly and
          small cracks in the ceiling. Some repairs are absolutely vital.
          Nothing kills a sale faster than signs of water damage. If there’s an
          unsafe electrical problem you must fix this too, for the good of the
          sale and the buyer’s safety (not to mention your own).
          <br />
          <div className="margin-top" />
          <div className="bold-content">2. Depersonalize your home.</div>
          Remember, you want buyers to walk through your house and feel like
          it’s their home, not yours! People just don’t have good visual
          imagination. They won’t see past your cluttered wall of family
          portraits, your collection of trophies or your ‘eccentric’ home decor.
          These things are guaranteed to prevent buyers from emotionally placing
          themselves in your home. Remove everything that’s too much about you.
          Although the buyer is a guest in your home, you want the buyer to
          imagine owning the home. You don’t want to make the buyer feel like an
          intruder.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            3. Never underestimate the power of paint.
          </div>
          Strong colours on the walls or wild wallpaper make it hard for buyers
          to imagine their furniture in your house. Consider repainting your
          home in bright, neutral colours that will enhance a room’s size and
          make it look more inviting. Next to cleaning your home, paint is the
          most cost-effective way to increase your home’s appeal, and attract
          offers.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            4. Let your Real Estate Professional market your home.
          </div>
          You’ve spruced up your home and it’s never looked better. It’s time
          for your Real Estate Professional to do their thing. Welcome to the
          appointment-only phase of showing your home. Your Real Estate
          Professional will act as a go-between and will give you as much notice
          for these visits as possible. If somebody is bold enough to knock on
          your door and ask for a “quick peak”, politely tell them that all
          visits are being handled by your Real Estate Professional. A good Real
          Estate Professional uses many strategies to attract a good number of
          eager buyers.
          <br />
          <div className="margin-top" />
          <div className="bold-content">5. The best way you can help.</div>
          Don’t be there. You want people to feel relaxed, and allow themselves
          to daydream that your home is their home. This just isn’t possible
          with you there. Go visit a friend, or if you have pets take them on a
          field trip.
        </div>
      </div>
    );
  };
  const guideSix = () => {
    return (
      <div className="content">
        {!props.mobile ? <div className="topic">When Offers Come In</div> : ""}

        <div className="content-text">
          <div className="margin-top" />
          <div className="bold-content">Receiving offers.</div>
          All your hard work has paid off, but you won’t know exactly how much
          it’s paid off until you see the offers. This is an exciting, often
          emotional time, so be prepared.
          <br />
          <div className="margin-top" />
          However, all offers in place may not be genuine. In the absence of a
          regulatory framework governing real estate transactions in Sri Lanka,
          there is no mechanism to prevent unqualified buyers making offers.
          This problem has many folds. Unqualified buyers are those who haven’t
          got their finances in place to make a purchase. Either they are
          foolishly optimistic that a lending institution would approve the
          amount they have in mind without an issue or want to first pay an
          advance and block a home and then sell theirs to raise the required
          money. Some have entered into flimsy sale agreements to sell theirs or
          just received an offer, in their opinion look very positive and
          genuine, for a property that has to sell first to go through the
          purchasing. Only a well versed Real Estate Professional will have the
          knowledge to ask the right questions to screen the good offers from
          the bad.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            Your Real Estate Professional will walk you through the process.
            You’ll see every offer.
          </div>
          Your Real Estate Professional will reveal you every offer that’s
          received. They’ll call for an appointment, usually at your home, to
          discuss offers. The buyers will not be there, so you can review and
          respond to the offers without any awkward pressure.
          <br />
          <div className="margin-top" />
          Here’s where emotions can really kick in, but remain calm. Listen to
          the Real Estate Professional before making any judgments. You must
          extensively analyze the merits of the offers. Maybe it’s time to plan
          your counter offer. You may also wish some private time to discuss
          things with your spouse.
          <br />
          <div className="margin-top" />
          <div className="bold-content">About the offer:</div>
          When it comes to the type of offer you receive, it really depends on
          your buyer’s individual situation.
          <br />
          <div className="margin-top" />
          <div className="bold-content">Firm Offer to Purchase:</div>
          Usually preferable to the seller, you, as it means the buyer is
          prepared to purchase the home without any conditions.
          <br />
          <div className="margin-top" />
          <div className="bold-content">Conditional Offer to Purchase:</div>
          Usually means there are one or more conditions on the purchase, such
          as “subject to resurvey”, “subject to financing”, etc. The home is not
          sold unless all the conditions have been met.
          <br />
          <div className="margin-top" />
          <div className="bold-content">Acceptance of Offer:</div>
          You may choose to accept the offer, reject it, or submit a
          counter-offer. The counter-offer may relate to the price, closing
          date, or any number of other variables. Offers can go back and forth
          until both parties have arrived at an agreement or either side ends
          the negotiations.
          <br />
          <div className="margin-top-40" />
          <div className="topic">
            {" "}
            Three options when responding to an Offer
          </div>
          <div className="margin-top" />
          <div className="bold-content">1. You can accept the Offer.</div>
          You got the price you were hoping for or maybe even more! The closing
          date looks good and there are no fussy conditions.
          <br />
          <div className="margin-top" />
          <div className="bold-content">2. You can reject the Offer.</div>
          This offer isn’t even close.
          <br />
          <div className="margin-top" />
          <div className="bold-content">3. You can “counter” the Offer.</div>
          This offer is close, but something’s not quite right. Now the delicate
          art of negotiation begins.
          <br />
          <div className="margin-top-40" />
          <div className="topic">Reasons Why You May Want to “Counter”</div>
          <div className="margin-top" />
          <div className="bold-content">1. You want more money.</div>
          This is by far the most common reason people “Counter”. Everybody
          wants to get the most for their home, and as the saying goes “if you
          don’t ask, you don’t get”. Go for it, but don’t get too greedy and
          insult someone who has made a fair offer.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            2. You want to change the closing date.
          </div>
          Maybe your buyer has already sold their previous home and has no place
          to live. They want to move in soon; sooner than you’d like. Maybe you
          haven’t even started looking for a new home! You can also compromise
          closing date. Welcome to the world of negotiation and compromise.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            3. There may be some undesirable conditions on the offer.
          </div>
          Conditions are points of contention that must be fulfilled in order
          for the sale to go through. Property inspections, resurveys and
          settlement plans are some common conditions that buyers place on their
          offers.
          <br />
          <div className="margin-top-40" />
          <div className="topic">The Art of Counter-Offers and Negotiation</div>
          <div className="margin-top" />
          Be prepared to compromise. “Win-win” doesn’t mean both the buyer and
          the seller will get everything they want. It means both sides will win
          some and give some. Rather than approaching negotiations from an
          adversarial winner-take-all perspective, focus on your top priorities
          and don’t let your emotions overrule your better judgment.
          <br />
          <div className="margin-top" />
          A successful negotiation is one that leaves both you and the buyer
          feeling satisfied with the outcome. This is a highly emotional time,
          so be sure to regularly “check your head”, and ask yourself “How
          important is this particular detail to me? Am I willing to jeopardize
          a sale over this?” Remember once you “counter” an offer, you are
          releasing the buyer from their offer and they are free to walk away.
          Thankfully, your Real Estate Professional is an expert and seasoned
          negotiator, and will help you every step of the way.
          <br />
          <div className="margin-top" />
          Successful negotiating is more than a matter of luck or natural
          talent. It also encompasses the learned ability to use certain skills
          and techniques to bring about those coveted win-win results.
          <br />
          <div className="margin-top" />
          Happy negotiating and best of luck!
        </div>
      </div>
    );
  };
  const guideSeven = () => {
    return (
      <div className="content">
        {!props.mobile ? (
          <div className="topic">Managing the Transaction</div>
        ) : (
          ""
        )}

        <div className="content-text">
          During this time or prior to the offer being conveyed, you may have to
          accommodate various representatives of the buyer. They may include the
          buyer’s friends and family, professionals such as architects and
          technically qualified persons and those providing religious and
          astrological guidance. Once you have negotiated an acceptable offer on
          your home, you will then release copies of title deeds and other
          documents usually require for title clearance. You will then begin the
          wait for closing day. During this time, the lending institution will
          be completing their work. The home will be inspected by a real estate
          appraiser to certify the value. Sometimes a resurvey of the property
          may be required. Your Real Estate Professional is truly the play-maker
          during this time. They will be coordinating all of the inspections and
          assisting with many different things.
        </div>
      </div>
    );
  };
  const guideEight = () => {
    return (
      <div className="content">
        {!props.mobile ? <div className="topic">Closing the Deal</div> : ""}

        <div className="content-text">
          Your negotiations were successful. Now you are ready to enter into a
          legally binding agreement. Is the house truly sold, though? No, not
          quite yet. It’s time for the vital final steps known as “closing”.
          Once the title is cleared and all of the mortgage processing (if
          applicable) has been completed and the buyer’s financing has been
          approved, the closing date will be set.
          <br />
          <div className="margin-top" />
          <div className="topic">
            Your Real Estate Professional and lawyer will do most of the work.
          </div>
          Thank goodness! Closing a deal involves many, many complicated and
          time-consuming legal maneuvers. That’s why you’ve hired professionals.
          <br />
          <div className="margin-top" />
          <div className="bold-content">
            How your lawyer will help with the sale?
          </div>
          Your lawyer will draw the Sale Agreement (if needed), review all
          important documents including the Deed of Transfer that require your
          signature. You can be legally binding to anything you sign, so it’s
          essential to make sure you’re protected.
          <br />
          <br />
          <div className="topic">Your Closing Checklist</div>
          <div className="margin-top" />
          You have plenty to do yourself. Here’s a comprehensive list.
          <br />
          <div className="margin-top" />
          1. Contact your lawyers and notify them to release the documents
          pertaining to your property to the buyer’s lawyers.
          <div className="margin-top" />
          2. Immediately begin satisfying any conditions of the agreement that
          require action on your part. They have definitive dates for completion
          and failure to do so can result in a lot of hassles and even spoil the
          whole deal.
          <div className="margin-top" />
          3. If you plan to “discharge” or pay off your mortgage with proceeds
          of the sale, you will need to obtain a statement from your lender
          showing your outstanding balance on the mortgage and any penalties
          you’ll have to pay to discharge the mortgage.
          <div className="margin-top" />
          4. Contact the utilities, telephone and cable companies about transfer
          or discontinuation of service.
          <div className="margin-top" />
          5. Contact a moving company to arrange your move on or prior to the
          closing date.
          <div className="margin-top" />
          6. Send out your change of address notices and advise the post office.
          <div className="margin-top" />
          7. Notify your Real Estate Professional immediately if anything
          changes about your property or your situation.
          <div className="margin-top-40" />
          <div className="bold-content">Congratulations!</div>
          <div className="margin-top" />
          You should be pleased that all your hard work paid off. We hope these
          steps helped make it easier. You’ve probably already planned to use
          the proceeds from your sale to purchase your next property. A very
          wise move indeed, because as you know, home ownership is one of the
          best long-term investments you’ll ever make.
        </div>
      </div>
    );
  };
  const renderPage = () => {
    if (props.selected === 1) {
      return propertySellers();
    } else if (props.selected === 2) {
      return guideOne();
    } else if (props.selected === 3) {
      return guideTwo();
    } else if (props.selected === 4) {
      return guideThree();
    } else if (props.selected === 5) {
      return guideFour();
    } else if (props.selected === 6) {
      return guideFive();
    } else if (props.selected === 7) {
      return guideSix();
    } else if (props.selected === 8) {
      return guideSeven();
    } else if (props.selected === 9) {
      return guideEight();
    } else {
      return propertySellers();
    }
  };
  return <div>{renderPage()}</div>;
};
export default SellerContent;
