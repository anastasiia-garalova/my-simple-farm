<?php

namespace App\Http\Requests;

use App\Enums\HarvestEntryQualityNote;
use App\Enums\HarvestEntryUnit;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateHarvestEntryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'harvest_id' => ['required', 'exists:harvests,id'],
            'recorded_at' => ['required', 'date'],
            'quantity' => ['required', 'numeric', 'min:1'],
            'unit' => ['required', Rule::in(HarvestEntryUnit::values())],
            'quality_note' => ['required', Rule::in(HarvestEntryQualityNote::values())],
        ];
    }
}
