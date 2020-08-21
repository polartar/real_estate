<?php

use App\FAQ;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FAQSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            [
                'question' => 'Why choose APT212?',
                'answer' => 'Our apartments are located throughout Manhattan’s most vibrant <a href="/nyc-neighborhoods">neighborhoods</a> and provide all the comforts and privacy of home at a fraction of the cost of nearby hotels. With an exceptional customer service team, we make it a priority to ensure our guests a comfortable and enjoyable stay.',
                'category' => 'General',
                'role' => 'guest'
            ],
            [
                'question' => 'What furniture is provided?',
                'answer' => 'All of our apartments are move-in ready. They are complete with contemporary furniture, a fully equipped kitchen (cookware, cutlery, etc.) and set up with Wifi and Cable TV. Not all units come with linen and towels, but a package is available for purchase at our Soho office. For most units, landlords are able to offer bed changes to accommodate larger groups..',
                'category' => 'General',
                'role' => 'guest'
            ],
            [
                'question' => 'Can I bring my own furniture?',
                'answer' => 'You are more than welcome to bring your own furniture and appliances to the residence. However we are not able to offer moving and storage services for the existing furniture already inside the apartment. If any of the original items are moved out, they must be returned to the unit prior to check-out.',
                'category' => 'General',
                'role' => 'guest'
            ],
            [
                'question' => 'Can I flex the start-date?',
                'answer' => 'Generally <a href="/booking">bookings</a> must start on the advertised availability date for any particular listing. For example, if an apartment is listed as available from June 1, the lease start date must be June 1. Occasionally landlords may have flexibility, so if an apartment does not match your exact start date contact a booking agent directly to see if the landlord can accommodate your desired date.',
                'category' => 'General',
                'role' => 'guest'
            ],
            [
                'question' => 'Can I rent for less that 30 days?',
                'answer' => 'Unfortunately not. <a href="/">APT212</a> operates within New York City laws, which prohibit rentals for under 30 days.',
                'category' => 'General',
                'role' => 'guest'
            ],
            [
                'question' => 'Can I rent month-to-month?',
                'answer' => 'We do not offer month-to-month leases but you are always welcome to extend your stay if the apartment is not rented. We recommend letting your booking agent know as soon as possible to ensure the unit is still available.',
                'category' => 'General',
                'role' => 'guest'
            ],
            [
                'question' => 'Can I extend my stay?',
                'answer' => 'Yes! Just contact your booking agent to ensure your apartment is available and to sort out any additional payments.',
                'category' => 'General',
                'role' => 'guest'
            ],
            [
                'question' => 'Can I view an apartment in person?',
                'answer' => 'Of course! You can schedule a tour with one of our booking agents directly on our website. You will be able to view the specific property you are interested in and agents will also be able to match you to other properties that match your preferences and budget. Some units require a 24-hour notice but in most cases we are able to coordinate same day showings. Out of consideration to our guests in occupied units, we ask that viewings take place between 10am - 6pm. Weekend showings are possible for the majority of our apartments as well.',
                'category' => 'General',
                'role' => 'guest'
            ],
            [
                'question' => 'Are the homes cleaned?',
                'answer' => 'Our professional housekeeping staff clean and prepare each home before guests arrive and after they depart. Some landlords also provide a monthly professional cleaning. More frequent housekeeping services can be arranged on request.',
                'category' => 'General',
                'role' => 'guest'
            ],
            [
                'question' => 'Is my data secure?',
                'answer' => 'Yes. We use a state of the art system to protect payment information. All sensitive data is encrypted and monitored on a regular basis. Our redundant infrastructure ensures the highest level of services available. It’s bank-grade security.',
                'category' => 'General',
                'role' => 'guest'
            ],
            [
                'question' => 'What is the refundable security deposit?',
                'answer' => 'Landlords, hosts and management companies throughout New York City require a security deposit - usually 1 month rent - in order to cover any repairs that may be required once the tenant moves out. Many also choose to deduct utilities and cleaning fees from the security deposit to simplify payments for their guests. The security deposit is held by the landlord/host, not APT212, and they are responsible for returning the balance within 30 days of move-out.',
                'category' => 'General',
                'role' => 'guest'
            ],
            [
                'question' => 'Can I rent for less that 30 days?',
                'answer' => 'Unfortunately not. APT212 operates within New York City laws, which prohibit rentals for under 30 days.',
                'category' => 'General',
                'role' => 'guest'
            ],
            [
                'question' => 'How do I book an apartment?',
                'answer' => 'Start by browsing our selection of properties. When you find one (or several!) that fit your needs, you can contact our booking agents directly to confirm availability, set up a viewing or make a reservation.',
                'category' => 'Booking',
                'role' => 'guest'
            ],
            [
                'question' => 'What paperwork do I need to book an apartment?',
                'answer' => 'We keep paperwork to a minimum. No U.S. credit checks, tax returns or guarantors are required. We only ask for a basic application and copy of your passport or U.S. driver’s license to complete a background check. All documents can be signed and submitted electronically.',
                'category' => 'Booking',
                'role' => 'guest'
            ],
            [
                'question' => 'What payments are required to reserve an apartment?',
                'answer' => 'All landlords require a good-faith deposit of 1-month rent to take the apartment off the market and an application fee, which is applied toward a background check. The deposit is non-refundable for approved renters. If you are not approved, the deposit will be returned to you.',
                'category' => 'Booking',
                'role' => 'guest'
            ],
            [
                'question' => 'What payments do you accept?',
                'answer' => 'Guests can pay securely online by eCheck (direct deposit from your bank account), wire transfer, cash or cashier’s check. We accept credit cards with a 3% processing fee.',
                'category' => 'Booking',
                'role' => 'guest'
            ],
            [
                'question' => 'What is a service fee?',
                'answer' => 'To help cover the costs of running APT212 guests are charged a service fee for all confirmed reservations. As part of our service, our guests receive unlimited access to a personal, on-the-ground booking agent who is available to assist with the entire rental process, from showing apartments to processing paperwork. The amount of the service fee varies and is based on a percentage of the reservation subtotal before taxes. The total amount can be viewed in the booking window prior to completing your reservation as well as on your booking confirmation. Hosts are also charged a service fee to cover the cost of processing payments and apartment maintenance.',
                'category' => 'Booking',
                'role' => 'guest'
            ],
            [
                'question' => 'Is there tax?',
                'answer' => 'In accordance with New York City laws, an occupancy tax of 6% of the gross rent is applied to lease terms less than 180 days. Some landlords and managements include tax in the base rent, others calculate the tax separately. The amount is indicated in the booking window prior to completing your reservation, on your booking offer and booking confirmation.',
                'category' => 'Booking',
                'role' => 'guest'
            ],
            [
                'question' => 'How long does it take to be approved?',
                'answer' => 'APT212 works with landlords and managements that can accommodate same-day move-ins. For rentals not starting within the week, you will receive a booking confirmation within 48 hours.',
                'category' => 'Booking',
                'role' => 'guest'
            ],
            [
                'question' => 'Do I sign a lease?',
                'answer' => 'Yes. You will receive an electronic copy of the lease agreement from the landlord or management company to review and sign prior to move-in.',
                'category' => 'Booking',
                'role' => 'guest'
            ],
            [
                'question' => 'Can you take corporate accounts?',
                'answer' => 'Yes. We are happy to work with businesses that require a corporate lease.',
                'category' => 'Booking',
                'role' => 'guest'
            ],
            [
                'question' => 'Do you offer discounts for group bookings?',
                'answer' => 'Yes. Contact us directly to discuss a group booking.',
                'category' => 'Booking',
                'role' => 'guest'
            ],
            [
                'question' => 'Why do rental prices fluctuate?',
                'answer' => 'The advertised monthly rents fluctuate according to seasonality and demand. For example, during winter months most landlords offer a discounted rate that will go back up to the standard rate starting March 1. These changes are calculated into the total price on your online booking. If you decide to extend, you may be charged a different rent than your initial one.',
                'category' => 'Booking',
                'role' => 'guest'
            ],
            [
                'question' => 'What is the cancellation policy?',
                'answer' => 'The landlords and managements we work with have a strict cancellation policy, so be sure to double check your dates and pricing before completing the booking process. If you cancel a booking prior to move-in, you will not be able to receive the non-refundable deposit back as the management has taken the apartment off the market and held it for you. If you cancel your stay prior to the end of your lease, you will still be responsible for the remaining payments of the full term of the stay. For example, if you have a lease from January 1 to March 31, you will be responsible for all payments until March 31 even if you physically move out of the apartment before then.',
                'category' => 'Booking',
                'role' => 'guest'
            ],
            [
                'question' => 'What is the difference between private rooms and full apartments?',
                'answer' => 'Private rooms are available for solo travelers looking for a bedroom in a multi-bedroom apartment that is shared with other guests. If you book a full apartment, you will be the only resident in the home.',
                'category' => 'Private Rooms',
                'role' => 'guest'
            ],
            [
                'question' => 'Can I rent more than one room?',
                'answer' => 'There is no restriction on the number of rooms a person can rent. If all rooms in an apartment are available you are welcome to book them all and have the apartment to yourself. Another option is to rent one of our studios or 1 bedroom units where you will be guaranteed to have the full unit to yourself.',
                'category' => 'Private Rooms',
                'role' => 'guest'
            ],
            [
                'question' => 'What furnishing is included in the private rooms?',
                'answer' => 'All rooms are furnished with basic necessities including a full-size bed, storage space (either a closet or dresser) and, in larger rooms, an office desk and chair. Sheets and towels are not provided, but a full hotel-quality linen package is available for purchase at the APT212 office.',
                'category' => 'Private Rooms',
                'role' => 'guest'
            ],
            [
                'question' => 'Is there a lock on my bedroom?',
                'answer' => 'Yes. All private rooms have a lock or key code for the door, which will be given to the guest upon check-in. If you are renting a room that is a fire exit (fire escape located outside the window), the room must remain unlocked and accessible in the case of an emergency. In these cases a padlock is provided for your closet or dresser so that you are able to store your valuables.',
                'category' => 'Private Rooms',
                'role' => 'guest'
            ],
            [
                'question' => 'What is the difference between private rooms and full apartments?',
                'answer' => 'Private rooms are available for solo travelers looking for a bedroom in a multi-bedroom apartment that is shared with other guests. If you book a full apartment, you will be the only resident in the home.',
                'category' => 'Private Rooms',
                'role' => 'guest'
            ],
            [
                'question' => 'Can two people share a room?',
                'answer' => 'Unfortunately not. Private rooms within shared apartments must be occupied by only one person. This is to avoid overcrowding for safety issues and day-to-day living.',
                'category' => 'Private Rooms',
                'role' => 'guest'
            ],
            [
                'question' => 'Can I have guests?',
                'answer' => 'Of course! Just be mindful that you share apartment with other residents so be respectful of the shared spaces. Overnight guests are permitted as long as your roommates are comfortable with them and the length and number of visits are within reason. Keep in mind rooms within shared units must only be permanently occupied by only one person.',
                'category' => 'Private Rooms',
                'role' => 'guest'
            ],
            [
                'question' => 'Are the rooms pet-friendly?',
                'answer' => 'Unfortunately pets are not allowed in shared apartments as some renters may have allergies and many landlords prohibit pets in their buildings.',
                'category' => 'Private Rooms',
                'role' => 'guest'
            ],
            [
                'question' => 'Can I switch rooms?',
                'answer' => 'Yes - switching rooms is possible at the end of your lease date. Simply contact your booking agent to ensure another room in your unit or a different shared apartment is available. You will need to sign a new lease agreement.',
                'category' => 'Private Rooms',
                'role' => 'guest'
            ],
            [
                'question' => 'Can I get information about my roommates or meet them before renting?',
                'answer' => 'The vast majority of renters are students and young professionals. All apartments are co-ed. Unfortunately we are unable to coordinate meetings between guests and prospective renters or roommate-matching services, but there’s always a chance they may be home during a showing. You can also check with your booking agent to get more specifics about the roommates in your rental, such as gender and occupation.',
                'category' => 'Private Rooms',
                'role' => 'guest'
            ],
            [
                'question' => 'Is it safe to live with people I have never met before?',
                'answer' => 'APT212 takes our guests’ safety seriously. We maintain a safe environment by ensuring all renters pass a thorough background check prior to being approved. The background check includes an extensive search against state and federal databases for criminal, eviction and sex-offender history. Anyone with a criminal history of any form of violence or theft will not be eligible to join the APT212 community.',
                'category' => 'Private Rooms',
                'role' => 'guest'
            ],
            [
                'question' => 'Why is my roommate’s rent different than mine?',
                'answer' => 'A number of factors influence pricing, including seasonality, size of room, and promotions. Prices are subject to change so we encourage all renters to view the pricing and availability at APT212.com for a real-time list of options for future bookings.',
                'category' => 'Private Rooms',
                'role' => 'guest'
            ],
            [
                'question' => 'Where do I get my keys?',
                'answer' => 'Guests can check-in after 3pm at our Soho office, Monday through Friday. For late night or weekend check-ins, you can coordinate directly with your booking agent.',
                'category' => 'Your Stay',
                'role' => 'guest'
            ],

            [
                'question' => 'What do the apartments come with?',
                'answer' => 'All of our apartments are move-in ready. They are complete with contemporary furniture, a fully equipped kitchen (cookware, flatware, etc.) and set up with Wifi and Cable TV. Linen packages are available for purchase and we are able to offer bed changes to accommodate larger groups.',
                'category' => 'Your Stay',
                'role' => 'guest'
            ],
            [
                'question' => 'What about utilities and cleaning charges?',
                'answer' => 'All apartments are set up with a high-speed wireless Internet and HD cable TV package for $140/month. Electricity is charged by usage. Some landlords require a monthly housekeeping service to ensure apartments are kept in good condition. A one-time move-out cleaning fee is charged at the end of your stay for a deep clean to get the apartment ready for the next guest. Utilities and cleaning fees are either deducted from the refundable security deposit, charged prior to move-in or paid month-to-month, which will be noted on your lease agreement or booking confirmation.',
                'category' => 'Your Stay',
                'role' => 'guest'
            ],
            [
                'question' => 'How do I pay my rent?',
                'answer' => 'After your move-in payment, rent is payable directly to the owner/landlord.',
                'category' => 'Your Stay',
                'role' => 'guest'
            ],
            [
                'question' => 'Are there any house rules?',
                'answer' => 'All apartments are non-smoking. For the safety of our guests and neighbors, managements cannot allow large parties or events.Not all of our residences allow pets.',
                'category' => 'Your Stay',
                'role' => 'guest'
            ],
            [
                'question' => 'How do I report a maintenance issue?',
                'answer' => 'Guests chave direct access to building management and customer service to report any issues and many are available 24/7.',
                'category' => 'Your Stay',
                'role' => 'guest'
            ],
            [
                'question' => 'When do I receive my refundable security deposit?',
                'answer' => 'The refundable security deposit is held directly by the landlord not by APT212. Your deposit is returned by the landlord within 30 days of your move out date.',
                'category' => 'Your Stay',
                'role' => 'guest'
            ],
            [
                'question' => 'condo',
                'answer' => 'A condominium is real property — a form of ownership, in which the owner has a separate unit, but the owners of all the units have joint ownership of their common areas. Those areas could include the building’s lobby, elevators, garden, roof terrace, residents’ lounge, health club and other amenities. A condominium association (usually with a name like “Main Street Condominium Association”) runs the building, often by hiring a professional property manager as its managing agent.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
            [
                'question' => 'condo',
                'answer' => 'A condominium is real property — a form of ownership, in which the owner has a separate unit, but the owners of all the units have joint ownership of their common areas. Those areas could include the building’s lobby, elevators, garden, roof terrace, residents’ lounge, health club and other amenities. A condominium association (usually with a name like “Main Street Condominium Association”) runs the building, often by hiring a professional property manager as its managing agent.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
            [
                'question' => 'co-op',
                'answer' => 'A co-op, by contrast, is a building or buildings owned by a corporation (usually with a name like “1111 West 100th Street Owners Corp.”) and owners are actually stockholders in the corporation rather than unit owners. Along with your shares of stock in a co-op, you would get a special type of lease, known as a proprietary lease, that will allow you to reside in your unit as a long-term tenant. Share allocation is determined when the building converts to a co-op, so it can vary by building. Generally, a larger apartment in a building will be allocated more shares than a smaller one and a higher-floor apartment will be allocated more shares than a lower-floor one.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
            [
                'question' => 'Condops',
                'answer' => ' – Condops are buildings with co-ops alongside commercial condos. The financial statements will often show two condominium units — the residential condominium unit (which is then organized as a co-op) will have one set of financial statements, and the commercial condominium unit another. The term “condop” is often used as well to indicate land-lease co-ops that operate with “condominium” — usually intended, in this context, to mean “sublet-friendly” — rules.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
            [
                'question' => 'Sponsor Unit',
                'answer' => '— An apartment that is being sold directly by the person who developed or converted the building. Often these units have been occupied by long-term tenants and are in need of renovation. However, in co-ops, the buyer of a sponsor unit is often allowed to bypass the board interview, so these units are often suitable for buyers who are nervous about the interview process.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Common charges and maintenance fees',
                'answer' => 'Once you own, you’ll find that you’ll end up paying common charges (to maintain the common areas in your condo) or maintenance fees (to maintain the building in your co-op). Co-op maintenance also includes payment of your share of the building’s underlying property taxes, while in a condo, those are paid separately to the city. Condominium property taxes are paid quarterly, but in a sales listing, the amount apportioned to a month is usually shown as “real estate taxes.” So if you are looking at a condo with property taxes of $6,000 a year, the listing will show real estate taxes of $500 a month, even though you’d actually pay the city $1,500 four times a year.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Common charges (CC)',
                'answer' => 'Common charges cover “common services and amenities” shared by other condo residents, including the management fees and operating expenses for a condominium building. ',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Application differences for condos and co-ops',
                'answer' => 'Purchasing in a co-op often requires the completion of a purchase application, which can be quite lengthy and detailed. A typical co-op purchase application might ask for a letter verifying the buyer’s employment, several letters of character and/or financial reference, multiple years of the buyer’s tax returns, and multiple monthly statements showing the buyer’s checking and retirement accounts. Some co-ops want you to show substantial assets, known as “reserves” in addition to the ability to make the purchase. Often a personal interview is required. While co-op boards are not legally allowed to discriminate, a board does not need to give a reason if it turns down a potential buyer. The application to purchase in a typical condominium is not usually as complex or financially rigorous and for that reason, co-op apartments tend to be cheaper than equivalently-sized and appointed condos. Financing a purchase in a co-op can be tougher than financing a purchase in a condo. That’s because co-ops typically require 20 percent down (which is often written as “80 percent financing allowed”). ',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],

            [
                'question' => 'Closing cost differences for condos vs. co-ops',
                'answer' => 'In addition, co-ops have lower closing costs than condominiums. If a condo buyer finances his purchase, he will get a mortgage and be subject to mortgage recording tax, which is currently 1.925 percent of the loan amount for loans over $500,000. Co-op buyers don’t get a mortgage, so they don’t pay a tax. Instead, they get what is technically known as a “share loan” with their shares of stock and proprietary lease as collateral. If the buyer of a condo and the buyer of a co-op each borrow $1 million, the condo buyer will pay $19,250 more in taxes and fees than the co-op buyer! A condo buyer will also end up paying a few hundred dollars for a recording fee and possibly several thousand dollars in title insurance.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'The day you sell…',
                'answer' => 'Finally, when it comes time to sell, you’ll have to get your building’s approval. (The need for constant permission is why some people prefer townhouses!) If you’re selling a condo, the association has a right to buy the apartment, which is known as the “right of first refusal.” Typically a seller will apply for a waiver of that right, but be aware that it can take 30 days to process that paperwork. If you’re selling a co-op, you have to make sure that the potential buyer can pass the board. So even though the buyer’s broker will be preparing the purchase application, you’ll want to be sure to give it a careful and thorough review. Many buildings (more often co-ops than condos) also have transfer or “flip” taxes when an apartment is sold as well as fees that are paid to the building. So, you’ll need to make the buyer aware of those costs and possibly negotiate the division of payment between buyer and seller.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Subletting and pied-à-terres',
                'answer' => 'The regulations governing in an individual building are laid out in the building’s bylaws and house rules, but generally condos are seen as more friendly to subletting. In the past, that has been seen by buyers as an advantage — as a lure to investors or as an “escape hatch” in case the buyer outgrew her apartment but didn’t want to sell immediately. However, with the rise of short-term rental companies, co-ops’ restrictions on subletting are sometimes seen as a positive: If you live in a co-op, you are more likely to see the same neighbors every day. Some co-ops like full-time residents; if you live out of town and are interested in buying a pied-à-terre, make sure that your intended co-op will allow that kind of part-time use.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Classic Six',
                'answer' => '— A prewar apartment with six rooms including the kitchen, master bedroom, second bedroom, living room, formal dining room, and small staff room, known as the “maid’s room,” which is usually off the kitchen. For the purposes of room count, bathrooms do not count as rooms, though a Classic Six usually has two bathrooms, and sometimes a small half bath near the staff room. A renovated classic six may have the maid’s room converted into a breakfast area or removed entirely to enlarge one of the other rooms. (See types of NYC apartments).',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Earnest Money',
                'answer' => '— Also known as a “contract deposit,” it’s the money that a buyer pays into escrow when the contract is signed as a pledge that he or she will fulfill the terms of the contract. The earnest money is usually part of the down payment, which is the amount of money that the buyer is paying in cash. A buyer of a million-dollar apartment might put down a 10 percent contract deposit (that is, $100,000) and then show up to closing with an additional 15 percent down payment ($150,000 in our example) and a mortgage loan for the remainder of the purchase price (in this case, 75 percent, or $750,000). (See more about earnest money).',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Financing',
                'answer' => ' — The percentage of the purchase price that the co-op or condo will allow to come in the form of a mortgage or share loan. If a building allows 70 percent financing, then the buyer must put the rest of the purchase price (in this case, 30 percent) down; you can also say that the buyer must make a 30 percent down payment.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Fixture',
                'answer' => ' — Personal property that has been permanently attached to real property. Fixtures will transfer with an apartment unless they are specifically excluded from the transfer in the real estate contract. If you are the selling broker, ask your clients if there are any fixtures that they want to remove and take with them. A common example would be a dining-room chandelier. Make sure that the removal of the fixture is listed in the deal sheet, and, subsequently, the contract of sale.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Listing Agreement',
                'answer' => ' — A contract between a brokerage and a potential seller for the sale of an apartment. A listing agreement will probably include: name of the brokerage; duties that the brokerage plans to undertake to sell the apartment; responsibilities of the seller; commission that the seller will pay if the apartment is sold, and an expiration date.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Maintenance Fees',
                'answer' => ' — These are monthly charges in a co-op. Similar to a condominium common charges, maintenance covers upkeep of the building, community utilities (e.g., lights and electricity in the hallways) and wages of staff or contract workers like the superintendent. Unlike common charges, maintenance also includes property taxes. (See more about maintenance fees).',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Managing Agent',
                'answer' => '— The person or firm hired by a building’s board to oversee the affairs of the building. A building’s managing agent may be the point of contact for purchase or rental applications.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Power',
                'answer' => '— Usually short for “power of attorney” (often abbreviated POA), this is a legal document authorizing someone else in your place. Often out-of-town buyers or sellers will grant a POA to a representative (often their attorney or a friend, but sometimes you as their real estate agent) to enable that person to close on a transaction on their behalf.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Prewar',
                'answer' => '— An apartment or townhouse built before World War II. Usually (but not always) solidly constructed, with high ceilings, floor or molding details, and smaller windows than apartments built after World War II (which are known as postwars).',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Virtual Staging',
                'answer' => ' — The process of electronically altering photos of an apartment to show what it would look like with furniture (or different furniture) in it. Virtual staging may help a buyer envision how to place furniture in an empty apartment. Photos that are “virtually staged” should be labeled as such.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Waiver of RFR',
                'answer' => '— In a condominium, it’s a document that must be obtained from the condo board before closing can proceed. When a condominium unit is sold, the condo association has a Right of First Refusal of the sale. That is, if the board finds a potential buyer financially unsuitable, or if it wishes to own the apartment to house building staff, the board can refuse to approve the sale and instead the association can buy the apartment itself. This rarely happens, but the process of getting the board to sign a waiver which states that the association is not exercising its right to buy unit X itself can be a slow one, taking 30 days or so.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Annual Interest Rate',
                'answer' => 'Annual Interest Rate is sometimes described as the stated or simple interest rate on a loan, as opposed to the Annual Percentage Rate or APR. It may not reflect the true cost of the loan - See APR',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Accounts Receivable',
                'answer' => 'Money owed by customers for goods or services that have been delivered or used, but not yet paid for. On a companys balance sheet, accounts receivables are recorded as current assets.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Appreciation',
                'answer' => 'Appreciation is the increase in propertys value over time based on the fair market value of comparable homes for sale in the neighborhood.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => '1031 Exchange',
                'answer' => 'Under Section 1031 of the United States Internal Revenue Code (26 U.S.C. § 1031), the exchange of certain types of property may defer the recognition of capital gains or losses due upon sale, and hence defer any capital gains taxes otherwise due.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
            [
                'question' => '1031 Exchange example',
                'answer' => 'EXAMPLE OF A 1031 EXCHANGE

The following is an example of the 1031 exchange process. The following compares a typical sale and a 1031 exchange:

Bill decided to sell the condominium he has owned for 6 years (relinquished property). The property’s current fair market value (F.M.V.) is $1,500,000; however, at the time he purchased the condo, the F.M.V. was $500,000. After Bill spent $50,000 in capital improvements and the property depreciated by $80,000, his adjusted cost basis was $470,000. Bill was advised by his tax consultant to engage in a tax-deferred exchange.

Bill’s real estate broker discovered an apartment building for $2,750,000 (replacement property). Bill purchased the property using the net proceeds from the sale of his condo within the 180 day period and successfully completed the 1031 exchange.  If Bill had sold his condo without using a 1031 exchange, he would have paid $144,500 in federal taxes.

Through the use of a 1031 exchange, Bill deferred his capital gains and depreciation recapture taxes, and had $144,500 more to invest into a replacement property. ',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Equity',
                'answer' => 'Cash Down payment ',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Closing costs',
                'answer' => 'Purchaser pays between 2-5% of the purchase price as closing fees. In our case, including all the legal cost, transactions fee, title recording fee, etc. (1% Mansion tax charged for any property over $1 million purchase price, Mortgage recording tax 2% of the loan amount)',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'CapEx／Renovation cost',
                'answer' => 'Capital expenditure, or CapEx, are funds used by a company to acquire or upgrade physical assets. It is often used to undertake new projects or investments or to maintain/ increase the scope of the operations. ',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Total Equity investment',
                'answer' => 'An equity investment generally refers to the buying and holding of shares of stock on a stock market by individuals and firms in anticipation of income from dividends and capital gains. In our case is all the cash investment',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'ROI',
                'answer' => 'ROI measures the amount of return on an investment relative to the investment’s cost. ROI = Benefit (or return) of an investment / Cost of the investment.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'IRR',
                'answer' => 'Internal rate of return (IRR) is a metric used in capital budgeting measuring the profitability of potential investments. IRR is a discount rate that makes the net present value (NPV) of all cash flows from a particular project equal to zero.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Interest payments',
                'answer' => 'The interest on existing business debt that is paid to banks and creditors',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Depreciation ( 27.5)',
                'answer' => 'Depreciation is an accounting method of allocating the cost of a tangible asset over its useful life. For tax purposes, businesses can deduct the cost of the tangible assets they purchase as business expenses; however, businesses must depreciate these assets in accordance with IRS rules about how and when the deduction may be taken. For our case, rental units are depreciated 27.5 years straight line.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Taxable Income ',
                'answer' => 'Taxable income is the amount of income used to calculate an individual\'s or a company\'s income tax due. Taxable income is generally described as gross income or adjusted gross income minus any deductions or exemptions allowed in that tax year.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Capital Gain Tax Bracket',
                'answer' => 'Capital gains tax, or CGT, is a tax imposed on the profit (capital gains) resulting from the sale of an investment.The tax amount paid depends on tax bracket. If falls in the 10% to 15% tax bracket, capital gains tax rate is zero. If falls in the 25% to 35% tax bracket, capital gains tax rate is 15%.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Amortization',
                'answer' => 'Amortization is the paying off of debt with a fixed repayment schedule in regular installments over a period of time.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Loan to Value (LTV)',
                'answer' => 'The loan-to-value (LTV) ratio is a financial term used by lenders to express the ratio of a loan to the value of an asset purchased. The term is commonly used by banks and building societies to represent the ratio of the first mortgage line as a percentage of the total appraised value of real property.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Financing',
                'answer' => ' — The percentage of the purchase price that the co-op or condo will allow to come in the form of a mortgage or share loan. If a building allows 70 percent financing, then the buyer must put the rest of the purchase price (in this case, 30 percent) down; you can also say that the buyer must make a 30 percent down payment.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Annual Interest Rate',
                'answer' => 'Annual Interest Rate is sometimes described as the stated or simple interest rate on a loan, as opposed to the Annual Percentage Rate or APR. It may not reflect the true cost of the loan - See APR',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Loan Amount',
                'answer' => 'Loan, a legal agreement by which a bank or other creditor lends money at interest in exchange for taking title of the debtor\'s property, with the condition that the conveyance of title becomes void upon the payment of the debt.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Mortgage Rate',
                'answer' => 'The rate of interest charged by a mortgage lender. Residential mortgage rate now is roughly 4%.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Term ( yrs)',
                'answer' => 'The terms of fixed rate mortgages can range from 10 years to up to 40 years, 30 years is the most common terms for mortgage.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Amortization',
                'answer' => 'The amount of principal reduction (repayment) on a loan or debt. Amortization payments are generally regular payments (usually monthly), made to reduce the debt along with the interest payments over the term of the loan. The term Amortization is used in connection with the periodic expensing of the cost or value of an intangible asset such as patents, trademarks or copyrights (similar to depreciation of a tangible assets well as prepaid expenses, such as subscription revenue whereby the amount prepaid is periodically included in income over the life of the subscription or prepaid expense.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Monthly payment  [interest+principal ]',
                'answer' => 'The fixed monthly payment required to fully amortize a loan over a term of months at a monthly interest rate.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Annual loan payment',
                'answer' => 'Mortgage principal and interest paid every year.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],
[
                'question' => 'Debt service coverage ratio',
                'answer' => 'The debt service coverage ratio (DSCR), also known as debt coverage ratio (DCR), is the ratio of cash available for debt servicing to interest, principal and lease payments.',
                'category' => 'Sales Terms',
                'role' => 'sales'
            ],




        ])
        ->each(function($faq) {
            FAQ::updateOrCreate([
                'question' => $faq['question'],
                'answer' => $faq['answer'],
                'category' => $faq['category'],
                'role' => $faq['role']
            ]);
        });
    }
}
