Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join('tmp', 'caching-dev.txt').exist?
    config.action_controller.perform_caching = true
    config.action_controller.enable_fragment_cache_logging = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = true

    config.cache_store = :null_store
  end
  
  # https://blog.bigbinary.com/2020/07/29/rails-6-1-adds-annotate_rendered_view_with_filenames-to-annotate-html-output.html
  # Now the rendered HTML will contain comment indicating the begining and end of each template.
  # Off until update to Rails 6.1
  # config.action_view.annotate_rendered_view_with_filenames = true

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Raises error for missing translations.
  # config.action_view.raise_on_missing_translations = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem. 
  # https://stackoverflow.com/questions/38663706/loaderror-could-not-load-the-listen-gem-rails-5
  # config.file_watcher = ActiveSupport::EventedFileUpdateChecker
  
  # Hartl Listing 11.2.2 
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :test
  host = 'localhost:3000' # Don't use this literally; use your local dev host instead
  config.action_mailer.default_url_options = { host: host, protocol: 'https' }
  
  # Moved to here from destination mentioned below because of error uploading to Heroku
  # e.g. in config/initializers/better_errors.rb
  # This will stop BetterErrors from trying to render larger objects, which can cause
  # slow loading times and browser performance problems. Stated size is in characters and refers
  # to the length of #inspect's payload for the given object. Please be aware that HTML escaping
  # modifies the size of this payload so setting this limit too precisely is not recommended.  
  # default value: 100_000
  BetterErrors.maximum_variable_inspect_size = 100_000
end
