// Walkhub
// Copyright (C) 2015 Pronovix
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import flux from "control";
import {createStore, bind} from "alt/utils/decorators";
import SearchActions from "actions/search";
import SearchSource from "sources/search";
import WalkthroughStore from "stores/walkthrough";

@createStore(flux)
class SearchStore {

	constructor() {
		this.state = {
			results: {},
		};
		this.registerAsync(SearchSource);
	}

	@bind(SearchActions.receivedSearch)
	receivedSearch(result) {
		const search = result.config.data.search;
		this.state.results[search] = result.data;
		result.data.forEach((res) => {
			if (res.type === "walkthrough") {
				WalkthroughStore.state.walkthroughs[res.entity.uuid] = res.entity;
			}
		});
	}
}

export default SearchStore;
