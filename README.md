paper-suggest-textarea [![Bower version](https://badge.fury.io/bo/paper-suggest-textarea.svg)](http://badge.fury.io/bo/paper-suggest-textarea) [![Travis state](https://travis-ci.org/Collaborne/paper-suggest-textarea.svg?branch=master)](https://travis-ci.org/Collaborne/paper-suggest-textarea)
=========

 Material Design textarea that provides suggestions as the user types. The web components are built with [Polymer 1.x](https://www.polymer-project.org).

![Screenshot](/doc/screenshot.png "Screenshot")


## Usage

`bower install paper-suggest-textarea`

```html
<paper-suggest-textarea
  value={{value}}
  suggest-query={{suggestQuery}}
  value-with-ids={{valueWithIds}}>
</paper-suggest-textarea>
```


## Properties

These properties are available for `paper-suggest-textarea`:

Property              | Type   | Description
--------------------- | ------ | ----------------------------
**value**             | String | Value as shown in the textarea
**placeholder**       | String | Placeholder of the textarea
**maxRows**           | Number | Maximum number of rows for the textarea
**specialChar**       | String | Character indicating when suggestions should be shown (default @)
**suggestQuery**      | String | Query for which suggestions should be shown
**valueWithIds**      | String | Value of the textarea but all names replaced by IDs


## License

    This software is licensed under the Apache 2 license, quoted below.

    Copyright 2011-2015 Collaborne B.V. <http://github.com/Collaborne/>

    Licensed under the Apache License, Version 2.0 (the "License"); you may not
    use this file except in compliance with the License. You may obtain a copy of
    the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
    License for the specific language governing permissions and limitations under
    the License.
