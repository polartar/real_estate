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
                'answer' => 'Our apartments are located throughout Manhattan’s most vibrant neighborhoods and provide all the comforts and privacy of home at a fraction of the cost of nearby hotels. With an exceptional customer service team, we make it a priority to ensure our guests a comfortable and enjoyable stay.',
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
                'answer' => 'Generally bookings must start on the advertised availability date for any particular listing. For example, if an apartment is listed as available from June 1, the lease start date must be June 1. Occasionally landlords may have flexibility, so if an apartment does not match your exact start date contact a booking agent directly to see if the landlord can accommodate your desired date.',
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
            ]
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
