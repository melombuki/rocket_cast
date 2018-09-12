import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
  model(params) {
    return this.store.query('podcast', {
      page: {
        number: params.page,
      }
    });
  },

  actions: {
    subscribe(url) {
      console.log(url);
      return fetch('http://localhost:3000/api/podcasts', {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": this.authService.getAccessToken(),
        },
        body: JSON.stringify({ url: url })
      })
        .then(() => {
          this.set('url', null);
          this.refresh();
        });
    }
  },

  queryParams: {
    page: {
      refreshModel: true,
    }
  },
});
