<?php

namespace App\Http\Requests;

use App\Enums\HarvestTeamMemberStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateHarvestTeamMemberRequest extends FormRequest
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
            'harvest_team_id' => ['required', 'exists:harvest_teams,id'],
            'user_id' => ['required', 'exists:users,id'],
            'status' => ['required', Rule::in(HarvestTeamMemberStatus::values())],
        ];
    }
}
