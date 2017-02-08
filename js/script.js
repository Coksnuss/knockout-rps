var actions = [
        { action:  'Rock'    , cssClass: 'fa fa-fw fa-hand-rock-o'    , activated: true, ro: true},
        { action:  'Paper'   , cssClass: 'fa fa-fw fa-hand-paper-o'   , activated: true, ro: true},
        { action:  'Scissors', cssClass: 'fa fa-fw fa-hand-scissors-o', activated: true, ro: true},
        { action:  'Well'    , cssClass: 'fa fa-fw fa-circle-o'       , activated: true, ro: false},
        { action:  'Lizard'  , cssClass: 'fa fa-fw fa-hand-lizard-o'  , activated: false, ro: false},
        { action:  'Spock'   , cssClass: 'fa fa-fw fa-hand-spock-o'   , activated: false, ro: false}
    ],
    // actionHistory = ko.observableArray(),
    action = { action: 'Unknown', cssClass: 'fa fa-fw fa-question' };

ko.bindingHandlers.animateZoom = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
        console.log("init", ko.unwrap(valueAccessor()));
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.
        console.log(ko.unwrap(valueAccessor()));
        console.log(element);
        jQuery(element).stop(true);
        jQuery(element).css('opacity', 0);
        jQuery(element).animate({
            opacity: 1,
        }, 500);
    }
};

ko.applyBindings({
    actions: actions.map(ko.observable),
    action: ko.observable(action),
    next: function () {
        var activeActions = this.actions.filter(function (o) {
            return o().activated;
        }),
        randomId = Math.floor(Math.random() * activeActions.length);
        this.action(activeActions[randomId]());
    }
});
