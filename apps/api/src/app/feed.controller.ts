import { Controller, Get } from '@nestjs/common';

import { ART, RADIO, VEHICLES } from './www-data';

@Controller()
export class FeedController {
  @Get('/feed')
  async feed() {
    const [events, camps, locations, departments] = await Promise.all([
      this.fetchData('events'),
      this.fetchData('camps'),
      this.fetchData('locations'),
      this.fetchData('departments'),
    ]);

    return {
      events,
      art: ART,
      camps,
      radios: RADIO,
      vehicles: VEHICLES,
      locations,
      departments,
    };
  }

  private async fetchData(dataType: string) {
    const response = await fetch(
      `https://whatwherewhen.lakesoffire.org/${dataType}.json`
    );
    const data = await response.json();
    return data.coalesce.coalesce;
  }
}
