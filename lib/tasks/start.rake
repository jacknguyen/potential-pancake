namespace :start do
  desc 'Start development server'
  task :dev do
    system 'foreman start -f Procfile.dev'
  end

  desc 'Start webpack dev server'
  task :webpack do
    exec Rails.root.join('bin', 'webpack-dev-server').to_s
  end
end

desc 'Start server'
task :start do
  task default: [Rake::Task['start:dev'].invoke]
end
