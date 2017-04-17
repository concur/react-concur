------

LEGACY 

...

/*** 10 lines of code ***/

switch (Stops) {
    case 0:
        stopText = OTGetUserMessage("TravelAvailabilityJS", "Nonstop");
        break;
    case 1:
        stopText = OTGetUserMessage("TravelAvailabilityJS", "OneStop");
        break;
    default:
        stopText = OTFormatUserMessage("TravelAvailabilityJS", "XStops", Stops);
        break;
}

...

------

NUI

...

/*** 13 lines of code plus one additional localized message ***/

switch (stops) {
    case 0:
        stopText = <FormattedMessage id='nonstop'/>;
        break;
    case 1:
        stopText = <FormattedMessage id='one-stop'/>;
        break;
    case 2:
        stopText = <FormattedMessage id='two-stops'/>;
        break;
    default:
        stopText = <FormattedMessage id='three-plus-stops' values={{numberOfStops: stops}}/>;
        break;
}

...

------