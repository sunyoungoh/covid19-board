import instance from './index';
import { AxiosResponse } from 'axios';
import { CovidSummaryResponse, CountryDetailResponse } from '@/types/covid';

// Summary
function fetchCovidSummary(): Promise<AxiosResponse<CovidSummaryResponse>> {
  return instance.get('summary');
}

// By Country Total All Status
function fetchCountryInfo(
  countryName: string | undefined,
): Promise<AxiosResponse<CountryDetailResponse>> {
  return instance.get(`total/country/${countryName}`);
}

export { fetchCovidSummary, fetchCountryInfo };
