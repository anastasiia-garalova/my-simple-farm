<?php

namespace App\Http\Requests;

use App\Enums\HarvestEntryUnit;
use App\Enums\HarvestLossReason;
use App\Enums\HarvestLossType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreHarvestLossRequest extends FormRequest
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
            'loss_type' => ['required', Rule::in(HarvestLossType::values())],
            'quantity' => ['required', 'numeric'],
            'reason' => ['required', Rule::in(HarvestLossReason::values())],
            'unit' => ['required', Rule::in(HarvestEntryUnit::values())],
            'recorded_at' => ['required', 'date'],
        ];
    }
}
