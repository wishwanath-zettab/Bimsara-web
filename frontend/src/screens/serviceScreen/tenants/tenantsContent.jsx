import React from "react";

const TenantsContent = (props) => {
  const guideOne = () => {
    return (
      <div className="content">
        {!props.mobile ? (
          <div className="topic">Do Your Homework in Advance</div>
        ) : (
          ""
        )}

        <div className="content-text">
          <div className="margin-top-40" />
          The factors to take into account when looking to rent a property are
          not much different than they would be for a prospective buyer. When
          you are searching for your rental property, don’t forget that you are
          about to make a commitment in the property, so make sure that it suits
          your requirements and that you will be happy there. If you are looking
          for leasing any real estate unit (house, apartment, business office,
          etc.), you may follow some logical steps in the decision-making
          process:
        </div>
      </div>
    );
  };
  const guideTwo = () => {
    return (
      <div className="content">
        {!props.mobile ? (
          <div className="topic">Check Your Financial Capabilities</div>
        ) : (
          ""
        )}
        <div className="content-text">
          <div className="margin-top-40" />
          <div className="bold-content">
            What is the maximum monthly rental you can comfortably afford?
          </div>
          <div className="margin-top" />
          <div className="bold-content">Do you have a suitable deposit?</div>
          <div className="margin-top" />
          It is necessary to lease a property appropriate for your financial
          capabilities and therefore we advise you not to lease such units above
          your financial capability because this would cause you financial
          difficulties that may affect your other basic needs.
          <div className="margin-top" />
          When considering renting out a home, you need to ensure that you have
          factored in all the costs. There is a security deposit to be paid,
          plus rent in advance, management fees, as well as moving costs – which
          are often not factored into the budget.
          <div className="margin-top" />
          You should also check what amounts are included in the monthly rental
          amount, and what will be billed separately. Rental amount is usually a
          flat fee for the rental of the unit, while consumables such as water,
          electricity, and security are billed over and above the monthly rental
          amount.
          <div className="margin-top" />
          Select the location based on your financial capabilities.
        </div>
      </div>
    );
  };
  const guideThree = () => {
    return (
      <div className="content">
        {!props.mobile ? (
          <div className="topic">It’s Still All About Location</div>
        ) : (
          ""
        )}

        <div className="content-text">
          <div className="margin-top-40" />
          Are you happy with the location? Focus on the area that works best for
          you. Is it well placed for work/studies/school/local amenities/public
          transport/social life? Can you park conveniently? You should also
          consider whether it’s clean and safe. Focus your search on the
          properties located at prime locations away from traffic congestion
          areas. Tenants should make a list of all suburbs that fit their
          criteria in this regard.
        </div>
      </div>
    );
  };
  const guideFour = () => {
    return (
      <div className="content">
        {!props.mobile ? (
          <div className="topic">Assessment of Accomodation Requirements</div>
        ) : (
          ""
        )}

        <div className="content-text">
          <div className="margin-top-40" />
          Once a few suburbs have been selected that meet both location and
          price points, you should make a list of your accommodation
          requirements.
          <div className="margin-top" />
          Is the property big enough for your requirements? Are the dimensions
          generous enough to accommodate your possessions? Think about whether,
          as well as bedroom space, there is enough space in living /dining
          areas and whether all your furniture will ﬁt.
          <div className="margin-top" />
          Does it have everything you need? Think about how important things
          like Broadband access, telephone points, enough plug/TV sockets and
          storage are to you – does the property meet your needs?
        </div>
      </div>
    );
  };
  const guideFive = () => {
    return (
      <div className="content">
        {!props.mobile ? (
          <div className="topic">Check List Before Confirming</div>
        ) : (
          ""
        )}
        <div className="content-text">
          <div className="margin-top-40" />
          Visit the area on different days and at different times. Are you happy
          with the property? Are both the inside and outside well-kept – you
          should look for signs of damp, damage and potential structural issues
          etc. Does everything work? Check the lighting, heating, water and
          appliances where possible.
          <div className="margin-top" />
          <div className="bold-content">
            Follow these useful tips to help avoid problems:
          </div>
          <div className="margin-top" />
          1. Do you like / trust the landlord / agent? It may seem very trivial,
          but an amicable relationship will be a huge beneﬁt towards the end of
          the tenancy, particularly if the return of the deposit is disputed.
          <div className="margin-top" />
          2. Does the landlord have any references?
          <div className="margin-top" />
          3. Do you have good references and do they know they may be contacted?
          <div className="margin-top" />
          4. When is the property available?
          <div className="margin-top" />
          5. Is the property fully/semi furnished or unfurnished?
          <div className="margin-top" />
          6. What is included? (e.g. washing machine, refrigerator, microwave,
          etc.)
          <div className="margin-top" />
          7. How many people are allowed to live in the property?
          <div className="margin-top" />
          8. Does the property get morning or afternoon sun?
          <div className="margin-top" />
          9. Who is responsible for mowing the lawn?
          <div className="margin-top" />
          10. Are pets allowed?
          <div className="margin-top" />
          11. Are there smoke alarms and do they work?
          <div className="margin-top" />
          12. Is there a burglar alarm and does it work?
          <div className="margin-top" />
          13. Is the kitchen equipment in good functioning order?
          <div className="margin-top" />
          14. What about Air conditioning? Do they all work? What will the
          running costs be? Is there sufficient insulation to keep the cool in.
          <div className="margin-top" />
          15. Run the taps, shower etc. to check everything works and has
          sufficient water pressure. Is hot water, if available, functioning
          efficiently?
          <div className="margin-top" />
          16. Check security. Do all doors and windows lock correctly and
          securely? Who, besides yourself, will hold keys?
          <div className="margin-top" />
          17. Are keys to the home numbered and inventoried?
          <div className="margin-top" />
          18. Are sufficient parking lots available for your convenience?
          <div className="margin-top" />
          19. Has the house/area been affected by flooding?
          <div className="margin-top" />
          20. Has the house/locality been the scene of a violent crime?
          <div className="margin-top" />
          21. What are the neighbours like? Why not knock on the door and say
          you are considering moving in, and wondered whether it was a quiet
          neighbourhood?
          <div className="margin-top" />
          22. Are you satisfied with the waste disposal services offered by the
          local council of the area?
          <div className="margin-top" />
          Do not enter into any lease contract except after you have inspected
          the leasehold and checked the proper functioning of all its services.
        </div>
      </div>
    );
  };

  const guideSix = () => {
    return (
      <div className="content">
        {!props.mobile ? (
          <div className="topic">Learn About The Liabilities</div>
        ) : (
          ""
        )}
        <div className="content-text">
          <div className="margin-top-40" />
          You must find out what your liabilities are before signing a lease
          agreement.
          <div className="margin-top" />
          “Anything that is agreed to between the tenant and the landlord/rental
          agent must be reduced to writing and included in the lease agreement
          in order to protect both parties.”
          <div className="margin-top" />
          Tenants will be responsible for keeping the unit in good repair, which
          would include replacing light bulbs, fuses and the like.
          <div className="margin-top" />
          Are you responsible for maintaining the garden? This is a common cause
          of disputes and best to establish as soon as possible. If the property
          has a pool, be clear about what the landlord or agent expects you to
          do to maintain them.
          <div className="margin-top" />
          Are you responsible for maintaining any internal ﬁxtures and ﬁttings?
          All this should be contained in your tenancy agreement if you go ahead
          with the property but it is best to ask as it may help you decide
          between properties.
        </div>
      </div>
    );
  };
  const guideSeven = () => {
    return (
      <div className="content">
        {!props.mobile ? <div className="topic">Tenancy Agreement</div> : ""}
        <div className="content-text">
          <div className="margin-top-40" />
          Prospective tenants should be prepared to sign a lease as soon as
          possible once they have found their ideal rental home. When you have
          found the perfect property act fast, there may be another viewing
          straight after. Being prepared to act immediately will assist in
          securing a rental home in a competitive market, therefore, prospective
          tenants should have this in mind when viewing the units on their
          shortlist.
          <div className="margin-top" />
          The tenancy agreement protects you as much as the landlord. Be careful
          with what you sign relating to your tenancy and do not let anybody
          rush you. Make sure the person you deal with has the proper
          authority/ownership to enter into a tenancy agreement with you.
          Remember, you are committing to a legally binding contract with no
          cooling-off period. Always request for a draft before signing. Before
          you sign the lease, make sure you read it thoroughly. If there is
          anything in the lease that you do not understand, ask questions. If
          you are unsure of anything, always seek the help of a legal
          professional.
          <div className="margin-top" />
          It is necessary that your documents would be ready for conclusion of
          the lease contract:
          <div className="margin-top" />
          For residential dwellings: National ID card or passports showing valid
          visa/ residence permits, employment confirmation from your employer
          and any other requirements specified by the landlord for tenant
          screening.
          <div className="margin-top" />
          For companies and establishments: articles of association, form 1
          (registration of a company) or 20 (notice of change of
          director/secretary and particulars of director/secretary), form 15
          (annual return) and form 41(certificate of incorporation), authorized
          signatory’s National ID Card/s.
        </div>
      </div>
    );
  };
  const guideEight = () => {
    return (
      <div className="content">
        {!props.mobile ? (
          <div className="topic">
            Move In & Move Out Comdition Report & Inventory
          </div>
        ) : (
          ""
        )}

        <div className="content-text">
          <div className="margin-top-40" />
          <div className="bold-content">
            Will a full Move in & Move out condition report be performed?{" "}
          </div>
          <div className="margin-top" />
          You should be present for both check-in and check-out and sign to say
          you are happy with the condition of the property on both occasions. Do
          check the inventory thoroughly, including the keys you take over, as
          this will form the basis of the out-going inventory at the end of the
          lease. Photos should be taken of the property as part of this. Take
          your own meter readings and keep them in a safe place to check against
          bills later. Take your own photos if you have concerns. Photos are a
          great way to record the condition of the property when you first move
          in. Take date-stamped photos of the property, especially areas that
          are damaged or unclean. Keep these photos in case the landlord objects
          to returning your security deposit at the end of your tenancy.
          <div className="margin-top" />
          For any promises made by the landlord or agent (for example, replace
          the oven, paint a room, clean up the backyard, etc.), receive written
          assurances that these will be undertaken before you move in.
        </div>
      </div>
    );
  };
  const guideNine = () => {
    return (
      <div className="content">
        {!props.mobile ? <div className="topic">Helpful Tips</div> : ""}
        <div className="content-text">
          <div className="margin-top-40" />
          1. Arrange one way to pay the rent and always retain proof of payment.
          <div className="margin-top" />
          2. Never stop paying your rent, even if the landlord is not complying
          with their side of the agreement (e.g. by failing to do repairs). You
          could end up being evicted if you do.
          <div className="margin-top" />
          3. Comply with the terms of your lease. In particular, never make any
          alterations, keep a pet or let other people move in without asking the
          landlord for permission first.
          <div className="margin-top" />
          4. What is the best way to contact the landlord? Make sure you know
          how to contact your Landlord (or their managing agent) in the event of
          an emergency.
          <div className="margin-top" />
          5. Familiarise yourself with the maintenance arrangements and any
          preferred contractors.
          <div className="margin-top" />
          6. If you find anything amiss then be sure to report it to the
          landlord or agent immediately.
          <div className="margin-top" />
          7. Keep a diary of your dealings with the landlord or agent – record
          all the times and dates of conversations, who you spoke to and what
          they agreed to do. If repairs are needed, put your request in writing
          to the landlord or agent and keep a copy. This type of evidence is
          very helpful if a dispute arises.
          <div className="margin-top" />
          8. Consider taking out home contents insurance. It will cover your
          belongings in case of theft, fires and natural disasters. The
          landlord’s building insurance, if they have it, will not cover your
          things.
          <div className="margin-top" />
          9. If you are happy in the place and your lease ends, consider asking
          for the lease to be renewed for another fixed term. This will remove
          the worry about being unexpectedly asked to leave and can help to lock
          in the rent for the next period of time.
        </div>
      </div>
    );
  };
  const renderPage = () => {
    if (props.selected === 1) {
      return guideOne();
    } else if (props.selected === 2) {
      return guideTwo();
    } else if (props.selected === 3) {
      return guideThree();
    } else if (props.selected === 4) {
      return guideFour();
    } else if (props.selected === 5) {
      return guideFive();
    } else if (props.selected === 6) {
      return guideSix();
    } else if (props.selected === 7) {
      return guideSeven();
    } else if (props.selected === 8) {
      return guideEight();
    } else if (props.selected === 9) {
      return guideNine();
    } else {
      return guideOne();
    }
  };
  return <div>{renderPage()}</div>;
};
export default TenantsContent;
