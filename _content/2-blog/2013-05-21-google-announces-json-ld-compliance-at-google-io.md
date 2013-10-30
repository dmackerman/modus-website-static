---
author: Mike
comments: true



title: Google Announces JSON-LD Compliance at Google I/O

categories:
  - Industry
  - Google API
  - Google I/O
  - JSON
  - JSON-LD
---

Google announced JSON-LD compliance for Schemas in their web apps, particularly for GMail, Google Search, and Google Now. The ramifications for JSON-LD across all of Google and other Internet sites, should Schemas and JSON- LD come into wide use are considerable. Native applications, such as Apple Mail, could also benefit if they add support for Schemas.





Google has supported Microdata based Schemas for about a year. Microdata Schemas are additions to HTML markup to provide hints to the browser or other application that is consuming the HTML. The short description of Microdata Schemas is that you add itemscope, itemtype, and itemname attributes to your HTML markup (e.g. within  or other valid HTML tags). These attributes allow Google to use your hints to enrich user experience across their apps and to provide better search results. JSON-LD is an alternative to the HTML oriented Microdata Schemas that is a close cousin to JSON, or JavaScript Object Notation. JSON-LD basically provides what Microdata does with the addition of “linked data.”



























































  All this is well and good, but what do Schemas buy us? Without Schemas, vendors have resorted to creating custom file formats that have become de facto standards. For example, there are .vcf files for email and phone contacts, and .ics files for calendar events. Over the years, these file formats have become so standard that every major implementation of email and calendar applications, native and web, support them.







  Schemas allow you to replace these older and rather limited file formats with the same sort of information, and a whole lot more, embedded within HTML documents proper. Embedding such information in HTML documents like WWW pages and emails has great value.







  A typical example might be an Event, which is supported by the Google apps. An Event consists of a place and time where something will take place, and a list of people (Persons) who are invited.







  The Event information could be included in an email or WWW page as a .ics file attachment or download, and the Persons’ information as .vcf file attachments. With .ics file and .vcf file attachments, you’re limited to what those file formats support, and collecting the contact information files can be tedious or problematic.







  Instead of forcing users to download these attachments and load them into their calendar or email programs, we are now able to embed Schemas within the HTML that contain a much richer set of information about the Events and Persons involved. You can not only encapsulate the Event and Persons information together, you can also include additional information such as air travel and hotel reservation information. We can even encapsulate bar codes and boarding passes.







  Google apps can trivially locate the Schema embedded in the HTML they process, extract the information provided, and update your calendar and email contacts. Native applications like Apple Mail can also process the Schemas. Of course, native apps can simply let Google do its thing and then sync up the data via the Google APIs.







  The beauty of the use of Schemas is that the terms or keywords allowed in the Schema can be enhanced over time. Older browsers or apps would simply ignore any new terms found in a most modern Schema.







  Google has supported Microdata for a while. You’ve almost certainly seen it in action in search results. Below is a sample “Rich Snippet” generated in a Google search result from the Microdata embedded in Pizza Suprema’s WWW page HTML: While Microdata has been very good for improving the quality of search result pages and to make the results themselves more informative, it lacks a key feature of JSON-LD called Linked Data (the “LD” in JSON-LD).







  Microdata lets you describe a Person using any of a number of keywords like first name, last name, and so on. But you basically have to define the Person (the desired fields) in the HTML document proper.







  Linked Data allows you to refer to the data structure that describes a Person that may be hosted somewhere else entirely. Using something like an HREF link (URL), you can specify in your Schema you refer to a person at that URL. You can make a list of Persons each with their own URL. Your Event can have its own URL as well. The value of the HTTP request fetching these URLs is JSON-LD formatted text, which is valid JSON with well known/defined member names.







  The technology behind JSON-LD is similar to a DTD type document. An example JSON-LD document (Schema) might look like this:







  ![Screen Shot 2013-05-21 at 12.46.20 PM](http://moduscreate.com/wp-content/uploads/2013/05/Screen-Shot-2013-05-21-at-12.46.20-PM.png)







  While the document above is perfectly valid JSON, it is further processed by a Linked Data aware processor. The wrapping < script> tags would be ignored by the browser (currently) because they don’t know about application/ld+json type scripts - just JavaScript is universally known by all browsers.







  The @context maps the remaining ﬁelds to the data structure deﬁned by the json-ld.org Person deﬁnition. The @id ﬁeld is the URL of a very comprehensive set of information about John Lennin. The name and born ﬁelds are deﬁned in the spec for Person at json-ld.org; the software processing the Schema will be able to use that information as it sees ﬁt. The spouse ﬁeld is a URL to information about Lennin’s spouse, Cynthia Lennon. It’s worth looking at those two dbpedia URLs to get a broader understanding of how detailed the information can be.







  The dbpedia.org URLs in the above document (and the @context as well) are examples of linked documents. The JSON-LD document links the information from these external sources together into an encapsulated unit of information that makes sense. In this case, it’s everything we might ever want to know about John Lennon.







  The value of these linked documents is that there can be a single (or a limited few) hosts for all Persons in the universe. One source for all. Every HTML document that references John Lennin can link to his Person JSON-LD ﬁle and that information used appropriately. It’s guaranteed to be the same John Lennin everywhere, and not some distant cousin of the famous dictator in some places.







  Below is an example HTML email that gmail will now consume and could provide more interesting actions and options than before. It is taken from https:// developers.google.com/gmail/schemas/embedding-schemas-in-emails







  ![Screen Shot 2013-05-21 at 12.46.31 PM](http://moduscreate.com/wp-content/uploads/2013/05/Screen-Shot-2013-05-21-at-12.46.31-PM.png)







  At the bottom of the page, they suggest that the ticketToken property of the FlightReservation object could be included to provide a barcode image, for John Smith’s boarding pass.







  What I’ve presented so far should give you a basic understanding of what the fuss is all about. I cannot conclude without discussing the potential issues I see going forward.







  First, how many companies or organizations are going to want to control the worldwide database of information about People?







  It’s quite possible we see organizations wanting to control the information about their members or employees, thus opting out of a global solution for hosting all People.







  If it comes down to a battle for the standards between Google and Microsoft, as we’ve seen with so many other technologies and standards, we may end up seeing TV commercials for the Bing version of People records.







  But who controls the information about Michael Schwartz (me)?







  What if I want to make some information known to people I trust and other information is to be kept private? The database of People is just the tip of the iceberg here. There are Events that I mentioned as well. Who manages the database of all the Events?







  The answers to these questions are interesting to ponder.




