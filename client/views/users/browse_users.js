Template.browseUsers.events({
  'click [data-id=load-more]': (event, template) => {
    template.limit.set(template.limit.get() + 20);
  },

  'keyup [data-id=search-query]': _.debounce((event, template) => {
    event.preventDefault();
    template.searchQuery.set(template.find('[data-id=search-query]').value);
    template.limit.set(20);
  }, 300)
});

Template.browseUsers.helpers({
  users: () => {
    return Meteor.users.find({ _id: { $ne: Meteor.userId() } }, { sort: { createdAt: -1 } });
  },

  hasMoreUsers: () => {
    return Template.instance().limit.get() <= Counts.get('users.all');
  }
});

Template.browseUsers.onCreated(function () {
  this.searchQuery = new ReactiveVar('');
  this.limit = new ReactiveVar(20);
  console.log("saleem");
  this.autorun(() => {
    this.subscribe('users.all',this.searchQuery.get(), this.limit.get());
  });
});
