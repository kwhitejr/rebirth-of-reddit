var PostBox = React.createClass({

  getInitialState: function () {
    return {
      data: []
    };
  },

  loadPostsFromServer: function (posts) {
    $.ajax({
      method: 'GET',
      url: 'https://www.reddit.com/r/gaming.json',
      dataType: 'json',
      data: posts,
      success: function (data) {
        console.log(data.data.children);
        this.setState({ data: data.data.children });
      }.bind(this)
    });
  },

  componentDidMount: function () {
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer, 5000);
  },

  render: function () {
    return (
      <div>
        <h1>Reddit Gaming</h1>
        <PostForm data={this.state.data} />
      </div>
    );
  }
});

var PostForm = React.createClass({
  render: function () {
    var postNodes = this.props.data.map(function (post, index) {
      return (
        <div key={index}>
          <h2>Presented by: {post.data.author}</h2>
          <h4><a href={post.data.url}>{post.data.title}</a></h4>
          <div><img src={post.data.thumbnail} /></div>
        </div>
      );
    });
    return (
      <div>
        {postNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <PostBox />,
  document.getElementById('content')
);