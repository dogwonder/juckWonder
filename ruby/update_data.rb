# download csv of data sources
require 'open-uri'
require 'csv'
require 'json'

url =  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQX1Fh4NHKIAGJSE9ev0ycV2RYmH2YQlCjVjvECX1u8dd-Hnh9Yv254QqicKpkcE9LsrIE1mywOijLD/pub?output=csv"

download = open(url)
IO.copy_stream(download, './json/sources.csv')

# for each row

sources = CSV.open('./json/sources.csv', headers: true).readlines

sources.each do |source|
  file_url = source['CSV']
  print source
  download = open(file_url)
  # download csv
  IO.copy_stream(download, './json/source.csv') 
  lines = CSV.open('./json/source.csv').readlines
  keys = lines.delete lines.first
  # keys.map! { |k| k.nil? ? "ID" : k.capitalize.gsub(/_(\w)/){$1.upcase}.gsub(/%/, "Percent")  }
  keys.map! { |k| k.nil? ? "ID" : k  }
  # export to json with file name
  File.open('./json/'+source['Output']+'.json', 'w') do |f|
    data = lines.map do |values|
      Hash[keys.zip(values)]
    end
    f.puts JSON.pretty_generate(data)
  end
end


