all

---

...

if (dynList.arrResults.length) {
	nui.travel.setBaseCurrencyCodes([ agencyCurrency ]);
	renderCurrencySelector();
}

...

---

availability_flight.js

----

function getPriceDetailsHTML(passengerDetails, totalFare, currencyCode) {
	var fareColumnText = OTGetUserMessage("TravelAvailabilityJS", "FareTitle");
	return nui.travel.PassengerPricingDetails.renderToStaticMarkup({ currencyCode: currencyCode, passengerDetails: passengerDetails, ticketTypeHeader: fareColumnText, totalEstimatedCost: totalFare});
}

...

availability_common.js

----

...

var gCurrencySelectorRendered = false;
function renderCurrencySelector() {
	if (!gCurrencySelectorRendered) {
		// Literally have to immediately set it to true or this will get called and rendered again
		gCurrencySelectorRendered = true;

		nui.travel.onCurrencyChange.subscribe(changeCurrency);
		nui.travel.onCurrencyError.subscribe(exchangeRateError);

		nui.travel.getCurrencies();
		nui.travel.CurrencySelector.render({ id: 'currencyDD' }, 'currencySpan');
	}
}

function changeCurrency(exchObj) {
	gExchangeRates = exchObj.exchangeRates;
	gCurrency = exchObj.currencyCode;
	refreshAirportFilter();
	refreshPriceSlider(dynList.sliders['price']);
}

function exchangeRateError() {
	CNQR.MessageBox.alert(OTGetUserMessage("TravelAvailabilityJs", "ExchangeRateError"), {
		icon: CNQR.MessageBox.ErrorIcon
	});
}

...

----

availability_hotel.js 

----

...

if (this.northstarId) {
	arrOutput.push('<div class="hotel-recommendation">' + nui.travel.HotelRecommendation.renderToStaticMarkup({ northstarId: this.northstarId }) + '</div>');
}

...

